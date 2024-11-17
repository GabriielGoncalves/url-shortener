import BaseController from "../../../common/controller";
import { IRegisterData, IRegisterUserService } from "../interfaces/register";

export default class RegisterController extends BaseController {
  constructor(
    data: IRegisterData,
    protected registerService: IRegisterUserService
  ) {
    super(data);
  }

  async execute() {
    try {
      this.validateRequest();

      const response = await this.registerService.register(this.data.body);

      return response;
    } catch (error) {
      throw error;
    }
  }
}
