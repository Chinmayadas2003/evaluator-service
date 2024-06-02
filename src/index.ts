import bodyParser from "body-parser";
import express, { Express, Request, response } from "express";

import bullBoardAdapter from "./config/bullBoardConfig";
import serverConfig from "./config/serverConfig";
import runCpp from "./containers/runCpp";
import runJava from "./containers/runJavaDocker";
import { runPython } from "./containers/runPythonDocker";
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

  //SampleWorker("SampleQueue");
  /*
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
    //lower priority is higher(better
    1,
  );
  */ //
  //note the indentation level very carefully to avoid error ;
  /*
  const code1 = `x = int(input())\nprint("value of x is", x)\nfor i in range(int(x)):\n  print(x+1)\n  x += 1`;
  const code = `x = int(input())\nprint("value of x is", x)\nfor i in range(int(x)):\n    print(x + 1)\n    x += 1`;
  runPython(code1, "100");
  */
  const code2 = `
 import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scn = new Scanner(System.in);
        int input = scn.nextInt();
        System.out.println("Input value given by user: " + input);
        for (int i = 0; i < input; i++) {
            System.out.println(i);
        }
    }
}
`;
  const code3 = `
#include <iostream>
using namespace std;
int main() {
    int input;
    std::cin >> input;
    std::cout << "Input value given by user: " << input << std::endl;
    for (int i = 0; i < input; ++i) {
        std::cout << i << " ";
    }
    return 0;
}

`;
  //use of stub by problem setter why we have to write function and not care about how it is output being printed
  const inputCase = `100 `;
  //runJava(code2, inputCase);
  runCpp(code3, inputCase);
});
