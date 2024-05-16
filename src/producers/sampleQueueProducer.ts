import sampleQueue from "../queues/sampleQueue";

//producer function
export default async function (
  name: string,
  payload: Record<string, unknown>,
  priority: number,
) {
  await sampleQueue.add(name, payload, { priority });
  console.log("sucessfully added new job");
}
