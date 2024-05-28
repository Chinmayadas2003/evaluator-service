import { number } from "zod";

import DockerStreamOutput from "../types/dockerStreamOutput";
import { DOCKER_STREAM_HEADER_SIZE } from "../utils/constants";

//take input and output stream and give them separately
export default function decodeDockerStream(buffer: Buffer): DockerStreamOutput {
  let offset = 0; //this varibale keeps track of the current postion in the buffer while parsing
  //the output that will store the accumulated stdout and stderr output as strings
  const output: DockerStreamOutput = { stdout: "", stderr: "" };

  while (offset < buffer.length) {
    //channel is read from buffer and has value of type of stream
    const channel = buffer[offset];

    //this length variable hold the length of the value
    //we will read this variable on an offset of 4 bytes from the start of the chunk(ie length of the data);
    const length = buffer.readUint32BE(offset + 4);

    //as now we have read the header we can move forward ot the value of the chunk(the first 8 bytes is header)
    offset += DOCKER_STREAM_HEADER_SIZE;

    if (channel === 1) {
      //stdout stream
      output.stdout += buffer.toString("utf-8", offset, offset + length);
    } else if (channel === 2) {
      //stderr stream
      output.stderr += buffer.toString("utf-8", offset, offset + length);
    }

    offset += length; // move offset to next chunk
  }
  return output;
}
