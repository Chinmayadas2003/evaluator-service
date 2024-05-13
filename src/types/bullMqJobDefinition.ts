import { Job } from "bullmq";
//payload definitions ->job object
export interface IJob {
  name: string;
  payload: Record<string, unknown>;
  handle: (job?: Job) => void;
  failed: (job?: Job) => void;
}
