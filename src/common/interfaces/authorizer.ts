import { JwtPayload } from "jsonwebtoken";
import { User } from "../../database/entities/user";

interface IResponseAuthorizer {
  token: string;
}

interface IAuthorizer {
  generateToken(user: User): IResponseAuthorizer;
  isValidToken(token: string): JwtPayload | string;
}

export { IAuthorizer, IResponseAuthorizer };
