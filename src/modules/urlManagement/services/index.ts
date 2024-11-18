import { IUrlManagerService } from "../interfaces";
import { IRepository } from "../../../database/repositories/interfaces";

export abstract class UrlManagerService implements IUrlManagerService {
  constructor(protected repo: IRepository) {}

  async execute(data: any): Promise<any> {
    try {
      const info = await this.getInformation(data);

      return await this.specificWork(info, data);
    } catch (error) {
      throw error;
    }
  }

  protected getFilter(data: any) {
    return {
      id: data?.id,
      user: {
        id: data.user_id,
      },
    };
  }

  protected abstract getInformation(data: any): Promise<any>;

  protected abstract specificWork(info: any, data: any): Promise<any>;
}
