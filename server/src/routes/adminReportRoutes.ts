import { Router } from "express";
import ExcelJS from "exceljs";

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

router.get("/daily", requireAdminAuth, async (req, res) => {
  const date = typeof req.query.date === "string" ? req.query.date : undefined;
  const { start, end } = getDateRange(date);

  const orders = await Order.find({
    createdAt: { $gte: start, $lt: end },
  }).sort({ createdAt: -1 });

  const totalSales = orders
    .filter((order) => order.status === "delivered")
    .reduce((sum, order) => sum + order.total, 0);

  res.json({
    date: start.toISOString().slice(0, 10),
    totalSales,
    orders,
  });
});

router.get("/daily/export", requireAdminAuth, async (req, res) => {
  const date = typeof req.query.date === "string" ? req.query.date : undefined;
  const { start, end } = getDateRange(date);

  const orders = await Order.find({
    createdAt: { $gte: start, $lt: end },
  }).sort({ createdAt: -1 });

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Daily Sales");

  sheet.columns = [
    { header: "Order ID", key: "id", width: 24 },
    { header: "Customer Name", key: "customerName", width: 22 },
    { header: "Phone", key: "customerPhone", width: 16 },
    { header: "Delivery Location", key: "deliveryLocation", width: 18 },
    { header: "Address", key: "address", width: 30 },
    { header: "Items", key: "items", width: 34 },
    { header: "Total", key: "total", width: 12 },
    { header: "Status", key: "status", width: 14 },
    { header: "Created At", key: "createdAt", width: 22 },
    { header: "Delivered At", key: "deliveredAt", width: 22 },
  ];

  orders.forEach((order) => {
    sheet.addRow({
      id: order._id.toString(),
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      deliveryLocation: order.deliveryLocation,
      address: order.address,
      items: order.items
        .map((item) => `${item.name} x${item.quantity}`)
        .join(", "),
      total: order.total,
      status: order.status,
      createdAt: order.createdAt?.toISOString(),
      deliveredAt: order.deliveredAt?.toISOString() ?? "",
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const filename = `agua-one-sales-${start.toISOString().slice(0, 10)}.xlsx`;

  res.setHeader("Content-Type", "application/vnd.openxmlformats");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.send(buffer);
});

export default router;
