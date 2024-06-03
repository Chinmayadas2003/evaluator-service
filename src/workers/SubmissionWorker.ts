import { Job, Worker } from "bullmq";

import redisConnection from "../config/redisConfig";
import SubmissionJob from "../jobs/SubmissionJob";
import { IJob } from "../types/bullMqJobDefinition";
import { WorkerResponse } from "../types/bullMqWorkerResponse";

export default function SubmissionWorker(queueName: string) {
  console.log("Setup the connection for redis", redisConnection);
  new Worker(
    queueName,
    async (job: Job) => {
      //console.log("SubmissionJob worker is working", job);
      if (job.name === "SubmissionJob") {
        const SubmissionJobInstance = new SubmissionJob(job.data);

        SubmissionJobInstance.handle(job);
        //why didn't we directly write handler here -single responsibility principle of a function;good coding pratices

        return true;
      }
    },
    {
      connection: redisConnection,
    },
  );
}
