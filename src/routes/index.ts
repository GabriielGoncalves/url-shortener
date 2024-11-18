import { Router } from "express";
import authRoutes from "../modules/auth/routes";
import shortenerRoutes from "../modules/shortener/routes";
import redirectorRoutes from "../modules/redirector/routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/shortener", shortenerRoutes);
router.use("/redirector", redirectorRoutes);

export default router;
