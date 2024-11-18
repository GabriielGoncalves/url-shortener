export interface IRepository {
  findOneByIdentification(filter: any): Promise<any>;
  save(data: any): Promise<any>;
  find(filter: any, options: any): Promise<any>;
}
