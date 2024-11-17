import { User } from "../../../database/entities/user";
import { IRepository } from "../../../database/repositories/interfaces";
import Encryption from "../../../utils/encryption";
import {
  IAuthenticator,
  IResponseAuthentication,
} from "../../interfaces/authenticator";

class Authenticator implements IAuthenticator {
  constructor(protected repo: IRepository) {}

  async login(data: any): Promise<IResponseAuthentication> {
    try {
      const user = await this.repo.findOneByIdentification(
        this.getFilter(data)
      );

      if (!user) throw new Error("Usuário não está registrado!");

      const isSamePass = await Encryption.decrypt(user.password, data.password);

      return isSamePass === true
        ? { isLogged: true, user: user as User }
        : { isLogged: false };
    } catch (error) {
      throw error;
    }
  }

  getFilter(data: any) {
    return {
      email: data.email,
    };
  }
}
