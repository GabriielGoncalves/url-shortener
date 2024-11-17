import { Request } from "express";

interface IAuthUserData {
  email: string;
  password: string;
}


interface IRegisterUserService {
  register(data: IAuthUserData): Promise<any>;
  getFilter(data: IAuthUserData): any;
}

interface IRegisterData {
  request: Request;
  body: IAuthUserData;
}

export { IRegisterUserService, IAuthUserData, IRegisterData };
