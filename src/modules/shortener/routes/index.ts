import { Router, Request, Response, NextFunction } from "express";
import urlShortenerValidator from "../validators";
import isAuthorized from "../../../common/middlewares/authorizerShortener";
import UrlShortenerController from "../controllers";
import urlShortenerService from "../services";
import { IShortenerData } from "../interfaces";

const router = Router();

router.post(
  "/",
  urlShortenerValidator,
  isAuthorized,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: IShortenerData = req.body;

      const instance = new UrlShortenerController(data, urlShortenerService);

      const response = await instance.execute();

      return res.status(200).json({
        msg: response,
      });
    } catch (error) {
      throw error;
    }
  }
);

const shortenerRoutes = router;

export default shortenerRoutes;
