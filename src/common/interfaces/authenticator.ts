import { User } from "../../database/entities/user";

interface IResponseAuthentication {
  isLogged: boolean;
  user?: User;
}

interface IAuthenticator {
  login(data: any): Promise<IResponseAuthentication>;
}

export { IResponseAuthentication, IAuthenticator };
