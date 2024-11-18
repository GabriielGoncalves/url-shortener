import { validationResult } from "express-validator";
import { IRedirectorData } from "../interfaces";

export default class RedirectorController {
  constructor(protected data: IRedirectorData, protected service: any) {}

  async execute(): Promise<any> {
    try {
      this.validateRequest();

      return await this.service.execute(this.data.id);
    } catch (error) {
      throw error;
    }
  }

  protected validateRequest() {
    const result = validationResult(this.data.request);

    const errors = result.array();

    if (errors.length) {
      console.log(errors);
      throw new Error("Errors de validação");
    }
  }
}
