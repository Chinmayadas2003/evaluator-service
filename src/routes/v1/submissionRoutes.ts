import express from "express";

import { pingCheck } from "../../controllers/pingController";
import { addSubmission } from "../../controllers/submissionController";
import { createSubmissionZodSchema } from "../../dtos/CreateSubmissionDTO";
import { validate } from "../../validators/zodValidator";
import v1Router from ".";

const submissionRouter = express.Router();

submissionRouter.post("/", validate(createSubmissionZodSchema), addSubmission);

export default submissionRouter;
