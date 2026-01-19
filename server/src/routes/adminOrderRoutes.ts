import { Router } from "express";

import { requireAdminAuth } from "../middleware/adminAuth";
import { Order } from "../models/Order";

const router = Router();

const getDateRange = (dateInput?: string): { start: Date; end: Date } => {
  const base = dateInput ? new Date(dateInput) : new Date();
  const start = new Date(base);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { start, end };
};

router.get("/", requireAdminAuth, async (req, res) => {
  const date = typeof req.query.date === "string" ? req.query.date : undefined;
  const { start, end } = getDateRange(date);

  const orders = await Order.find({
    createdAt: { $gte: start, $lt: end },
  }).sort({ createdAt: -1 });

  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  const totalDelivered = orders
    .filter((order) => order.status === "delivered")
    .reduce((sum, order) => sum + order.total, 0);

  res.json({
    orders,
    totalSales,
    totalDelivered,
  });
});

router.patch("/:id/delivered", requireAdminAuth, async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: "delivered", deliveredAt: new Date() },
    { new: true }
  );

  if (!order) {
    res.status(404).json({ message: "Order not found" });
    return;
  }

  res.json(order);
});

export default router;
