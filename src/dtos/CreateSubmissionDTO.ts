import { z } from "zod";

// export interface CreateSubmissionDto {
//   userId: string;
//   problemId: string;
//   code: string;
//   language: string;
// }

//or
export type CreateSubmissionDto = z.infer<typeof createSubmissionZodSchema>;

//zod schema(can create other file for zod schema ) also we dont need above interface we can creat it using zod schema

export const createSubmissionZodSchema = z
  .object({
    userId: z.string(),
    problemId: z.string(),
    code: z.string(),
    language: z.string(),
  })
  .strict();
