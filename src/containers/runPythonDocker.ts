import Docker from "dockerode";

import { TestCases } from "../types/testCases";
import { PYTHON_IMAGE } from "../utils/constants";
import createContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";

const rawLogBuffer: any[] = [];

export async function runPython(code: string, inputTestCase: string) {
  console.log("Initializing a new python docker container");

  // Properly escape the code and inputTestCase to be safely used in the shell command
  //regex function regular expression g is global flag for a sepecifc character
  const escapedCode = code.replace(/"/g, '\\"').replace(/\n/g, "\\n");
  //this is a done a bit differently than in course replace it in case of the error
  const escapedInput = inputTestCase.replace(/"/g, '\\"');

  const runCommand = `echo "${escapedCode}" > test.py && echo "${escapedInput}" | python3 test.py`;
  console.log(runCommand);

  const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
    "/bin/sh",
    "-c",
    runCommand,
  ]);

  await pythonDockerContainer.start();
  console.log("started the docker container");

  const loggerStream = await pythonDockerContainer.logs({
    stdout: true,
    stderr: true,
    timestamps: false,
    follow: true, // whether the logs are streamed or returned as a string
  });

  // Attach events on the stream objects to start and stop reading
  loggerStream.on("data", (chunk) => {
    rawLogBuffer.push(chunk);
  });

  await new Promise((res) => {
    loggerStream.on("end", () => {
      console.log(rawLogBuffer);
      const completeBuffer = Buffer.concat(rawLogBuffer);
      const decodedStream = decodeDockerStream(completeBuffer);
      console.log(decodedStream);
      console.log(decodedStream.stdout);
      res(decodeDockerStream);
    });
  });

  // remove the container when done with it
  await pythonDockerContainer.remove();
}

export default runPython;
