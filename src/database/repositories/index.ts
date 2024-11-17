import { IRepository } from "./interfaces";
import typeorm from "typeorm";

export default abstract class Repository implements IRepository {
    protected abstract instanceRepository: typeorm.Repository<any>;
  
    async findOneByIdentification(
      filter: any
    ): Promise<any | null> {
      try {
        return await this.instanceRepository.findOneBy(filter);
      } catch (error) {
        throw error;
      }
    }
  
    async save(data: any): Promise<any | null> {
      try {
        return await this.instanceRepository.save(data);
      } catch (error) {
        throw error;
      }
    }
  }