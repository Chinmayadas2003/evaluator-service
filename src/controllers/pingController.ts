import { Request, Response } from "express";
//instead of req we usedd _ variable(imp)
export const pingCheck = (_: Request, res: Response) => {
  return res.status(200).json({
    message: "Ping check ok",
  });
};
