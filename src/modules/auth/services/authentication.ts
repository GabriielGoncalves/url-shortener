import { IAuthenticator } from "../../../common/interfaces/authenticator";
import {
  IAuthorizer,
  IResponseAuthorizer,
} from "../../../common/interfaces/authorizer";
import authenticator from "../../../common/utils/auth/authenticator";
import Authorizer from "../../../common/utils/auth/authorizer";
import IAuthenticationService from "../interfaces/authentication";
import { IAuthUserData } from "../interfaces/register";

class AuthenticationService implements IAuthenticationService {
  constructor(
    protected authenticator: IAuthenticator,
    protected authorizer: IAuthorizer
  ) {}

  async auth(data: IAuthUserData): Promise<IResponseAuthorizer> {
    try {
      const { isLogged, user } = await this.authenticator.login(data);

      if (!isLogged) throw new Error("Usuário ou senha incorretos!");

      const response = await this.authorizer.generateToken(user!);

      return response;
    } catch (error) {
      throw error;
    }
  }
}

const authenticationService = new AuthenticationService(
  authenticator,
  new Authorizer()
);

export default authenticationService;
