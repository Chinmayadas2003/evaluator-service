import bodyParser from "body-parser";
import express, { Express, Request, response } from "express";

import serverConfig from "./config/serverConfig";
import apiRouter from "./routes";

const app: Express = express(); //it also can implicitly understand the express type

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use("/api", apiRouter);

app.listen(3000, () => {
  console.log(`Server started at *:${serverConfig.PORT}`);
  console.log("hello jelly");
});
