import { Job, Worker } from "bullmq";

import redisConnection from "../config/redisConfig";
import SampleJob from "../jobs/SampleJob";
import { IJob } from "../types/bullMqJobDefinition";
import { WorkerResponse } from "../types/bullMqWorkerResponse";

export default function SampleWorker(queueName: string) {
  console.log("Setup the connection for redis", redisConnection);
  new Worker(
    queueName,
    async (job: Job) => {
      //console.log("sample job worker is working", job);
      if (job.name === "SampleJob") {
        const sampleJobInstance = new SampleJob(job.data);

        sampleJobInstance.handle(job);
        //why didn't we directly write handler here -single responsibility principle of a function;good coding pratices

        return true;
      }
    },
    {
      connection: redisConnection,
    },
  );
}
