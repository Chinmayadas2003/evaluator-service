import bodyParser from "body-parser";
import express, { Express, Request, response } from "express";

import serverConfig from "./config/serverConfig";
import sampleQueueProducer from "./producers/sampleQueueProducer";
import sampleQueue from "./queues/sampleQueue";
import apiRouter from "./routes";
import SampleWorker from "./workers/SampleWorker";

const app: Express = express(); //it also can implicitly understand the express type

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use("/api", apiRouter);

app.listen(3000, () => {
  console.log(`Server started at *:${serverConfig.PORT}`);
  console.log("hello jelly");
});

SampleWorker("SampleQueue");
sampleQueueProducer("SampleJob", {
  name: "Sanket",
  company: "Microsoft",
  position: "SDE 2 L61",
  location: "Remote||BLR||bhubaneswar",
});
