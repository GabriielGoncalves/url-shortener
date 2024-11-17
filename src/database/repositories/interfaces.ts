export interface IRepository {
  findOneByIdentification(filter: any): Promise<any>;
  save(data: any): Promise<any>;
}
