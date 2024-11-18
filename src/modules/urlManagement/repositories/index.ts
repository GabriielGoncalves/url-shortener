import connection from "../../../database/connection";
import { UrlShortener } from "../../../database/entities/urlShortener";
import Repository from "../../../database/repositories";
import * as typeorm from "typeorm";

class UrlManagementRepository extends Repository {
  protected override instanceRepository: typeorm.Repository<any> =
    connection.getRepository(UrlShortener);
}

const urlManagementRepository = new UrlManagementRepository();

export default urlManagementRepository;
