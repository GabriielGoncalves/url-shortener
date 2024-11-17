import BaseController from "../../../common/controller";
import IAuthenticationService from "../interfaces/authentication";
import { IRegisterData } from "../interfaces/register";

export default class LoginController extends BaseController {
  constructor(
    data: IRegisterData,
    protected authenticationService: IAuthenticationService
  ) {
    super(data);
  }

  async execute() {
    try {
      this.validateRequest();

      const response = await this.authenticationService.auth(this.data.body);

      return response;
    } catch (error) {
      throw error;
    }
  }
}
