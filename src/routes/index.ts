import { Router } from "express";
import authRoutes from "../modules/auth/routes";
import shortenerRoutes from "../modules/shortener/routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/shortener", shortenerRoutes);

export default router;
