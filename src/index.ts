import express, {Request,response,Express} from "express";
import serverConfig from "./config/serverConfig";

const app: Express = express(); //it also can implicitly understand the express type

app.listen(3000,()=>{
    console.log(`Server started at *:${serverConfig.PORT}`);
    console.log("hello jelly");
});
