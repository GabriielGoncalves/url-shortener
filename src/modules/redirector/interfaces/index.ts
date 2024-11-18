import { Request } from "express";

interface IRedirectorData {
  request: Request;
  id: string;
}

interface IRedirectorService {
  execute(id: string): Promise<any>;
}

export { IRedirectorService, IRedirectorData };
