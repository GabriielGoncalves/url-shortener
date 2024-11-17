import { IAuthenticator } from "../../../common/interfaces/authenticator";
import { IAuthorizer, IResponseAuthorizer } from "../../../common/interfaces/authorizer";
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
