import { validationResult } from "express-validator";
import { IRegisterData } from "../../modules/auth/interfaces/register";
import IController from "../interfaces";

export default abstract class BaseController implements IController {
  constructor(protected data: IRegisterData) {}

  abstract execute(): Promise<any>;

  protected validateRequest() {
    const result = validationResult(this.data.request);

    const errors = result.array();

    if (errors.length) {
      console.log(errors);
      throw new Error("Errors de validação");
    }
  }
}
