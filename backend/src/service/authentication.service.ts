import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model";
import { config } from "dotenv";
config();

export interface UserPayload {
  id: string;
  usermail: string;
}

export class AuthenticationService {
  async findUserByEmail(email: string): Promise<boolean | any> {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return false;
    }
    return user;
  }

  async userLogin(
    email: string,
    password: string
  ): Promise<string | undefined> {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const payload: UserPayload = { id: user.id, usermail: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    return token;
  }
}
