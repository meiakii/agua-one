import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import path from "path";

import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import orderRoutes from "./routes/orderRoutes";
import adminOrderRoutes from "./routes/adminOrderRoutes";
import adminReportRoutes from "./routes/adminReportRoutes";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/admin", express.static(path.join(process.cwd(), "public", "admin")));

app.get("/", (_req, res) => {
  res.send("Agua-One API");
});

app.get("/admin", (_req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "admin", "index.html"));
});

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/admin/reports", adminReportRoutes);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  });
