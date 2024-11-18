import { UrlManagerService } from ".";
import urlManagementRepository from "../repositories";

export class ListUrlManagerService extends UrlManagerService {
  protected override async getInformation(data: any): Promise<any> {
    try {
      const urls = await this.repo.find(this.getFilter(data), {});

      return urls;
    } catch (error) {
      throw error;
    }
  }

  protected override specificWork(info: any, data: any): Promise<any> {
    return info;
  }

  protected override getFilter(data: any): any {
    const superGetFilter = super.getFilter(data);

    Reflect.deleteProperty(superGetFilter, "id");

    return {
      ...superGetFilter,
      is_active: true,
    };
  }
}

const listUrlManagerService = new ListUrlManagerService(
  urlManagementRepository
);

export default listUrlManagerService;
