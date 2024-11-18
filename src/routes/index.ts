import { Router } from "express";
import authRoutes from "../modules/auth/routes";
import shortenerRoutes from "../modules/shortener/routes";
import redirectorRoutes from "../modules/redirector/routes";
import managementRoutes from "../modules/urlManagement/routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/shortener", shortenerRoutes);
router.use("/redirector", redirectorRoutes);
router.use("/url-management", managementRoutes);

export default router;
