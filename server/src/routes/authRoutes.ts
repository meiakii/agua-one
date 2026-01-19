import { Router } from "express";

import { createAdminToken, revokeAdminToken } from "../services/adminTokens";
import { requireAdminAuth } from "../middleware/adminAuth";

const router = Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body as {
    username?: string;
    password?: string;
  };

  const adminUsername = process.env.ADMIN_USERNAME ?? "aguaonewrs";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "aguaonewrspassword";

  if (username !== adminUsername || password !== adminPassword) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const token = createAdminToken();
  res.json({ token });
});

router.post("/logout", requireAdminAuth, (req, res) => {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

  if (token) {
    revokeAdminToken(token);
  }

  res.json({ message: "Logged out" });
});

export default router;
