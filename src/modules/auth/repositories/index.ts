import * as typeorm from "typeorm";
import Repository from "../../../database/repositories";
import connection from "../../../database/connection";
import { User } from "../../../database/entities/user";

class AuthRepository extends Repository {
  protected override instanceRepository: typeorm.Repository<any> =
    connection.getRepository(User);
}

export default new AuthRepository();
