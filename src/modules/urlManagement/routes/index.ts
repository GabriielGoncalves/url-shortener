import { NextFunction, Request, Response, Router } from "express";
import authMiddleware from "../../../common/middlewares/auth";
import { urlIdValidator, updateUrlValidator } from "../validators";
import listUrlManagerService from "../services/list";
import removeUrlManagerService from "../services/remove";
import UrlManagementController from "../controllers";
import updateUrlManagerService from "../services/update";

const router = Router();

router.get(
  "/",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = {
        request: req,
        body: req.body,
      };

      const instance = new UrlManagementController(body, listUrlManagerService);

      const response = await instance.execute();

      return res.status(200).json({ msg: response });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  updateUrlValidator,
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = {
        request: req,
        body: {
          ...req.body,
          id: req.params.id,
        },
      };

      const instance = new UrlManagementController(
        body,
        updateUrlManagerService
      );

      const response = await instance.execute();

      return res.status(200).json({ msg: response });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  urlIdValidator,
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = {
        request: req,
        body: {
          ...req.body,
          id: req.params.id,
        },
      };

      const instance = new UrlManagementController(
        body,
        removeUrlManagerService
      );

      const response = await instance.execute();

      return res.status(200).json({ msg: response });
    } catch (error) {
      next(error);
    }
  }
);

const managementRoutes = router;

export default managementRoutes;
