import bodyParser from "body-parser";
import express, { Express, Request, response } from "express";

import bullBoardAdapter from "./config/bullBoardConfig";
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
app.use("/ui", bullBoardAdapter.getRouter());

app.listen(serverConfig.PORT, () => {
  console.log(`Server started at *:${serverConfig.PORT}`);
  console.log("hello jelly");
  console.log(
    `BullBoard dashboard running on: http://localhost:${serverConfig.PORT}/ui`,
  );

  SampleWorker("SampleQueue");

  sampleQueueProducer(
    "SampleJob",
    {
      name: "Sarthak",
      company: "Razorpay",
      position: "SDE 1 L60",
      location: "Remote||BLR||bhubaneswar",
    },
    2,
  );

  sampleQueueProducer(
    "SampleJob",
    {
      name: "Sanket",
      company: "Microsoft",
      position: "SDE 2 L61",
      location: "Remote||BLR",
    },
    //lower priority is higher(better)
    1,
  );
});
