import { User } from "../../../database/entities/user";
import environment from "../../../utils/enviroment";
import jwt from "jsonwebtoken";
import { IAuthorizer, IResponseAuthorizer } from "../../interfaces/authorizer";

export default class Authorizer implements IAuthorizer {
  isValidToken(token: string): jwt.JwtPayload | string {
    try {
      const valid = jwt.verify(token, environment.secret_key!, {
        ignoreExpiration: false,
      });
      return valid;
    } catch (error) {
      throw error;
    }
  }

  generateToken(user: User): IResponseAuthorizer {
    try {
      const token = jwt.sign({ data: user }, environment.secret_key!, {
        expiresIn: "24h",
      });

      return {
        token,
      };
    } catch (error) {
      throw error;
    }
  }
}
