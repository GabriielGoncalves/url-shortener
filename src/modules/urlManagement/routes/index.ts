import { NextFunction, Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {});

router.put("/:id", (req: Request, res: Response, next: NextFunction) => {});

router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {});

const managementRoutes = router;

export default managementRoutes;
