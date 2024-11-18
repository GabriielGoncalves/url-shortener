import { Request, Response, NextFunction } from "express";
import Authorizer from "../utils/auth/authorizer";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split("Bearer ")[0];

  if (!token) {
    return res.status(401).json({ msg: "Token not provided" });
  }

  try {
    const decoded: any = new Authorizer().isValidToken(token);

    req.body = { ...req.body, user_id: decoded.data.id };

    return next();
  } catch (error) {
    console.log("Authentication error:", error);
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};

export default authMiddleware;
