import { UrlManagerService } from ".";
import urlManagementRepository from "../repositories";

export class UpdateUrlManagerService extends UrlManagerService {
  protected override async getInformation(data: any): Promise<any> {
    try {
      const urls = await this.repo.findOneByIdentification(this.getFilter(data));

      return urls;
    } catch (error) {
      throw error;
    }
  }

  protected override async specificWork(info: any, data: any): Promise<any> {
    try {
      return await this.repo.save({
        ...info,
        originalUrl: data.url,
      });
    } catch (error) {
      throw error;
    }
  }
}

const updateUrlManagerService = new UpdateUrlManagerService(
  urlManagementRepository
);

export default updateUrlManagerService;