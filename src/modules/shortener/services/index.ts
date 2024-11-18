import * as nano from "nanoid";
import { IRepository } from "../../../database/repositories/interfaces";
import environment from "../../../utils/enviroment";
import { IShortenerData, IUrlShortenerService } from "../interfaces";
import urlShortenerRepository from "../repositories";

class UrlShortenerService implements IUrlShortenerService {
  constructor(protected repo: IRepository) {}

  async shorten(data: IShortenerData): Promise<any> {
    const urlId = this.generateUrlIdentification();

    if (data.info_user) {
      await this.persistInformation({
        id: urlId,
        user: {
          id: data.info_user.id,
        },
        originalUrl: data.url,
      });
    }

    return `${environment.base_url}/${urlId}`;
  }

  protected generateUrlIdentification() {
    return nano.nanoid(6);
  }

  protected async persistInformation(data: any) {
    try {
      await this.repo.save(data);
    } catch (error) {
      throw error;
    }
  }
}

const urlShortenerService = new UrlShortenerService(urlShortenerRepository);

export default urlShortenerService;
