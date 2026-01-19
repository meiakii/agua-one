import { Request, Response, NextFunction } from "express";

import { isAdminTokenValid } from "../services/adminTokens";

export const requireAdminAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token || !isAdminTokenValid(token)) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  next();
};
