import { UrlManagerService } from ".";
import urlManagementRepository from "../repositories";

export class RemoveUrlManagerService extends UrlManagerService {
  protected override async getInformation(data: any): Promise<any> {
    try {
      const url = await this.repo.findOneByIdentification(
        this.getFilter(data)
      );

      return url;
    } catch (error) {
      throw error;
    }
  }

  protected override async specificWork(info: any, data: any): Promise<any> {
    try {
      return await this.repo.save({
        ...info,
        is_active: false,
      });
    } catch (error) {
      throw error;
    }
  }
}

const removeUrlManagerService = new RemoveUrlManagerService(
  urlManagementRepository
);

export default removeUrlManagerService;
