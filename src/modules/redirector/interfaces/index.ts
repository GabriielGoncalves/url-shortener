import { Request } from "express";

export interface IRedirectorData {
  request: Request;
  id: string;
}
