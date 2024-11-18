import { IRepository } from "../../../database/repositories/interfaces";
import urlShortenerRepository, {
  UrlShortenerRepository,
} from "../../shortener/repositories";

interface IRedirectorService {
  execute(id: string): Promise<any>;
}

class RedirectorService implements IRedirectorService {
  constructor(protected repo: UrlShortenerRepository) {}

  async execute(id: string): Promise<any> {
    try {
      const document = await this.repo.findOneByIdentification({
        id,
      });

      if (!document) return null;

      await this.repo.updateDoc(this.incrementClickCounter(document));

      return document;
    } catch (error) {
      throw error;
    }
  }

  protected incrementClickCounter(doc: any) {
    return {
      ...doc,
      clicks_number: doc.clicks_number + 1,
    };
  }
}

const redirectorService = new RedirectorService(urlShortenerRepository);

export default redirectorService;
