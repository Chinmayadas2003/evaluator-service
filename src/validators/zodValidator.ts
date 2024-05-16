import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

import { CreateSubmissionDto } from "../dtos/CreateSubmissionDTO";

//this is a middleware set before the controller function; zod schema is of type any or createSubmissionDto
export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        //serializing and deserializing data dsa q
        //destructing req.body
        ...req.body,
      });
      next();
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: "Invalid request params recieved",
        data: {},
        error: error,
      });
    }
  };
