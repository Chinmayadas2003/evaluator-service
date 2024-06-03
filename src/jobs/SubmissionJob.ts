import { Job } from "bullmq";

import runJava from "../containers/runJavaDocker";
import { IJob } from "../types/bullMqJobDefinition";
import { SubmissionPayload } from "../types/SubmissionPayload";

export default class SubmissionJob implements IJob {
  name: string;
  payload: Record<string, SubmissionPayload>;
  constructor(payload: Record<string, SubmissionPayload>) {
    this.payload = payload;
    this.name = this.constructor.name;
  }

  //handle method
  handle = async (job?: Job) => {
    console.log("Handler of the job called");
    console.log(this.payload);
    if (job) {
      const key = Object.keys(this.payload)[0];
      console.log(this.payload[key].language);
      if (this.payload[key].language === "Java") {
        const response = await runJava(
          this.payload[key].code,
          this.payload[key].inputCase,
        );
        console.log("evaluated response is ", response);
      }
    }
  };

  failed = (job?: Job): void => {
    console.log("Job failed");
    if (job) {
      console.log(job.id);
    }
  };
}

export default SubmissionJob;
