import { JwtPayload } from "jsonwebtoken";
import { User } from "../../database/entities/user";

interface IResponseAuthorizer {
  token: string;
}

interface IAuthorizer {
  generateToken(user: User): Promise<IResponseAuthorizer>;
  isValidToken(token: string): Promise<JwtPayload | string>;
}

export { IAuthorizer, IResponseAuthorizer };
