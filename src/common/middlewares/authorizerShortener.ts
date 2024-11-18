import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { IAuthUserData } from "../../modules/auth/interfaces/register";
import Authorizer from "../utils/auth/authorizer";

const divergentData = (dataToken: any, body: IAuthUserData): boolean => {
  return dataToken.data.email === body.email;
};

const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split("Bearer ")[0];

  if (!token) return next();

  const errors = validationResult(req).array();

  if (errors.length) {
    console.log(errors);
    return res.status(400).send(`com erros de validação ${errors}`);
  }

  try {
    const instanceAuthorizer = new Authorizer();

    const isValidToken: any = instanceAuthorizer.isValidToken(token!);

    if (!isValidToken || !divergentData(isValidToken, req.body))
      return res.status(401).send("Access denied, user without permission.");

    req.body = {
      ...req.body,
      info_user: isValidToken.data,
    };

    next();
  } catch (error) {
    throw error;
  }
};

export default isAuthorized;
