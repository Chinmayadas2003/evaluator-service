import sampleQueue from "../queues/sampleQueue";

//producer function
export default async function (name: string, payload: Record<string, unknown>) {
  await sampleQueue.add(name, payload);
  console.log("sucessfully added new job");
}
