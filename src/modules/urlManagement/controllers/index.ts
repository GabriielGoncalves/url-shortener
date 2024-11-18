import BaseController from "../../../common/controller";
import { IUrlManagerService } from "../interfaces";

export default class UrlManagementController extends BaseController {
  constructor(data: any, protected service: IUrlManagerService) {
    super(data);
  }

  override async execute(): Promise<any> {
    try {
      this.validateRequest();

      return await this.service.execute(this.data.body);
    } catch (error) {
      throw error;
    }
  }
}
