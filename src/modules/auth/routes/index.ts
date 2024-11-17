import { Router, Request, Response, NextFunction } from "express";
import authValidator from "../validators";
import RegisterController from "../controllers/register";
import LoginController from "../controllers/login";
import { IRegisterData } from "../interfaces/register";
import registerUserService from "../services/register";

const router = Router();

router.post(
  "/register",
  authValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: IRegisterData = {
        request: req,
        body: req.body,
      };

      const instance = new RegisterController(data, registerUserService);

      const response = await instance.execute();

      return res.status(201).json({
        msg: response,
      });
    } catch (error: any) {
      next(error);
    }
  }
);

router.post(
  "/login",
  authValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: IRegisterData = {
        request: req,
        body: req.body,
      };

      const instance = new LoginController(data, {} as any);

      const response = await instance.execute();

      return res.status(201).json({
        msg: response,
      });
    } catch (error: any) {
      next(error);
    }
  }
);

const authRoutes = router;

export default authRoutes;
