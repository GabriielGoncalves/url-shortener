import { Router, Request, Response, NextFunction } from "express";
import redirectorValidator from "../validators";
import { IRedirectorData } from "../interfaces";
import RedirectorController from "../controllers";
import redirectorService from "../services";

const router = Router();

router.get(
  "/:id",
  redirectorValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: IRedirectorData = {
        request: req,
        id: req.params.id,
      };

      const instance = new RedirectorController(data, redirectorService);

      const response = await instance.execute();

      if (!response)
        return res.status(404).json({
          msg: "Recurso não encontrado!",
        });

      return res.status(301).redirect(response.originalUrl);
    } catch (error: any) {
      next(error);
    }
  }
);

const redirectorRoutes = router;

export default redirectorRoutes;
