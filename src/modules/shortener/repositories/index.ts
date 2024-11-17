import { Repository as typeOrmRepository } from "typeorm";
import Repository from "../../../database/repositories";
import connection from "../../../database/connection";
import { UrlShortener } from "../../../database/entities/urlShortener";

class UrlShortenerRepository extends Repository {
  protected override instanceRepository: typeOrmRepository<any> =
    connection.getRepository(UrlShortener);

  async updateDoc(doc: any) {
    try {
      await this.instanceRepository.upsert(doc, ["id"]);
    } catch (error) {
      throw error;
    }
  }
}

export default new UrlShortenerRepository();
