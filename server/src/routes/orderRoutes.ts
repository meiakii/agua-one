import { Router } from "express";

import { Order } from "../models/Order";

const router = Router();

const PRODUCT_PRICES: Record<string, number> = {
  "350 ml bottle": 7,
  "500 ml bottle": 9,
  "gallon round": 230,
  "gallon slim": 230,
  "gallon refill": 25,
  "gallon refill - slim": 25,
  "gallon refill - round": 25,
};

router.post("/", async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      address,
      deliveryLocation,
      instructions,
      items = [],
    } = req.body as {
      customerName: string;
      customerPhone: string;
      address: string;
      deliveryLocation: string;
      instructions?: string;
      items: { product: string; quantity: number }[];
    };

    const normalizedItems = items.map((item) => {
      const key = item.product?.toLowerCase?.() ?? "";
      const price = PRODUCT_PRICES[key] ?? 0;
      return {
        name: item.product,
        quantity: item.quantity,
        price,
      };
    });

    const total = normalizedItems.reduce(
      (sum, item) => sum + (item.price ?? 0) * item.quantity,
      0
    );

    const orderPayload = {
      customerName,
      customerPhone,
      address,
      deliveryLocation,
      items: normalizedItems,
      total,
      status: "pending",
      ...(instructions ? { instructions } : {}),
    };

    const order = await Order.create(orderPayload);

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to create order" });
  }
});

router.get("/", async (_req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

export default router;
