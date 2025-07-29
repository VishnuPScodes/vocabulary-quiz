import { IAuthBody } from "../types/auth.types";
import { Request, Response } from "express";

export const loginUser = async (
  req: Request,
  res: Response
): Promise<string | undefined> => {
  const { username, password } = req.body as IAuthBody;
  if (!username || !password) {
    throw new Error("Username and password are required");
  }

  const token = await authenticateUser(email, password);
  if (!token) {
    res.status(401).send("Invalid credentials");
    return;
  }

  return res.status(200).json({ token });
};
