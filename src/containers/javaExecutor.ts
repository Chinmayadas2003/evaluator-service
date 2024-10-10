import Docker from "dockerode";

import CodeExecutorStrategy, {
  ExecutionResponse,
} from "../types/CodeExecutorStrategy";
import { JAVA_IMAGE } from "../utils/constants";
import createContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";
import pullImage from "./pullImage";

class JavaExecutor implements CodeExecutorStrategy {
  async execute(
    code: string,
    inputTestCase: string,
  ): Promise<ExecutionResponse> {
    console.log(code, inputTestCase);
    const rawLogBuffer: Buffer[] = [];

    await pullImage(JAVA_IMAGE);

    console.log("Initializing a new Java Docker container");
    console.log(`Code received is \n ${code.replace(/'/g, `'\\"`)}`);
    const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > Main.java && javac Main.java && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | java Main`;
    console.log(runCommand);

    const javaDockerContainer = await createContainer(JAVA_IMAGE, [
      "/bin/sh",
      "-c",
      runCommand,
    ]);

    // Starting the Docker container
    await javaDockerContainer.start();

    console.log("Started the Docker container");

    const loggerStream = await javaDockerContainer.logs({
      stdout: true,
      stderr: true,
      timestamps: false,
      follow: true, // Stream the logs in real-time
    });

    // Attach events on the stream objects to start and stop reading
    loggerStream.on("data", (chunk) => {
      rawLogBuffer.push(chunk);
    });

    try {
      const codeResponse: string = await this.fetchDecodedStream(
        loggerStream,
        rawLogBuffer,
      );
      return { output: codeResponse, status: "COMPLETED" };
    } catch (error) {
      return { output: error as string, status: "ERROR" };
    } finally {
      await javaDockerContainer.remove();
    }
  }

  fetchDecodedStream(
    loggerStream: any,
    rawLogBuffer: Buffer[],
  ): Promise<string> {
    // TODO: Cleanup repetitive fetchDecodedStream
    // TODO: May be moved to the docker helper util

    return new Promise((res, rej) => {
      const timeout = setTimeout(() => {
        console.log("Timeout called");
        rej("TLE");
      }, 2000);
      loggerStream.on("end", () => {
        // This callback executes when the stream ends
        clearTimeout(timeout);
        console.log(rawLogBuffer);
        const completeBuffer = Buffer.concat(rawLogBuffer);
        const decodedStream = decodeDockerStream(completeBuffer);
        if (decodedStream.stderr) {
          rej(decodedStream.stderr);
        } else {
          res(decodedStream.stdout);
        }
      });
    });
  }
}

export default JavaExecutor;
