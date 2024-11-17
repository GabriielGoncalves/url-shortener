import { IRepository } from "../../../database/repositories/interfaces";
import Encryption from "../../../utils/encryption";
import { IAuthUserData, IRegisterUserService } from "../interfaces/register";
import authRepository from '../repositories'

export class RegisterUserService implements IRegisterUserService {
  constructor(protected repo: IRepository) {}

  async register(data: IAuthUserData): Promise<string> {
    try {
      const foundedUser = await this.repo.findOneByIdentification(
        this.getFilter(data)
      );

      if (foundedUser) throw new Error("Usuário já cadastrado!");

      data.password = await this.handleData(data.password);

      await this.repo.save(data);

      return "Usuário registrado com sucesso!";
    } catch (error) {
      throw error;
    }
  }

  protected async handleData(pass: string): Promise<string> {
    try {
      return await Encryption.encrypt(pass);
    } catch (error) {
      throw error;
    }
  }

  getFilter(data: IAuthUserData): Record<any, any> {
    return {
      email: data.email,
    };
  }
}

export default new RegisterUserService(authRepository);