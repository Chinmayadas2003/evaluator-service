import Docker from "dockerode";

import { TestCases } from "../types/testCases";
import { PYTHON_IMAGE } from "../utils/constants";
import createContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";

const rawlogBuffer: any[] = [];

export async function runPython(code: string, inputTestCase: string) {
  console.log("Initializing a new python docker container");

  // Properly escape the code and inputTestCase to be safely used in the shell command
  //regex function regular expression g is global flag for a specific character
  const escapedCode = code.replace(/"/g, '\\"');//.replace(/\n/g, "\\n");
  const escapedInput = inputTestCase;
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

  // attach events on the stream object to start and stop reading
  loggerStream.on("data", (chunk) => {
    rawlogBuffer.push(chunk);
  });
  loggerStream.on("end", () => {
    console.log(rawlogBuffer);
    const completeBuffer = Buffer.concat(rawlogBuffer);
    const decodedStream = decodeDockerStream(completeBuffer);
    console.log(decodedStream);
  });

  return pythonDockerContainer;
}

export default runPython;
