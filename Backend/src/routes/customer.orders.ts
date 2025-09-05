import { Router } from "express";
import prisma from "../config/db";
import { authenticate } from "../middlewares/auth";

const router = Router();

// All order routes require authentication
router.use(authenticate(["USER"]));

// GET /api/orders - Get user's order history
router.get("/", async (req: any, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // For now, return mock orders since full Order model isn't migrated yet
    const mockOrders = [
      {
        id: 1,
        code: "ORD-001",
        status: "DELIVERED",
        totalAmount: 25.98,
        createdAt: new Date(),
        restaurant: {
          id: 1,
          name: "Mario's Italian Kitchen"
        },
        items: [
          {
            id: 1,
            name: "Margherita Pizza",
            quantity: 2,
            unitPrice: 12.99,
            totalPrice: 25.98
          }
        ]
      }
    ];

    res.json({
      orders: mockOrders,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: mockOrders.length,
        pages: Math.ceil(mockOrders.length / limitNum)
      }
    });
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
});

// GET /api/orders/:id - Get order details
router.get("/:id", async (req: any, res) => {
  try {
    const userId = req.user.id;
    const orderId = parseInt(req.params.id);

    // Mock order detail for now
    const mockOrder = {
      id: orderId,
      code: `ORD-${orderId.toString().padStart(3, '0')}`,
      status: "DELIVERED",
      totalAmount: 25.98,
      deliveryFee: 2.99,
      serviceFee: 1.99,
      createdAt: new Date(),
      estimatedDeliveryTime: "25-35 min",
      restaurant: {
        id: 1,
        name: "Mario's Italian Kitchen",
        address: "123 Main St"
      },
      address: {
        label: "Home",
        address: "456 User St, Apt 4B"
      },
      items: [
        {
          id: 1,
          name: "Margherita Pizza",
          quantity: 2,
          unitPrice: 12.99,
          totalPrice: 25.98,
          customizations: {}
        }
      ]
    };

    res.json(mockOrder);
  } catch (error: any) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Failed to fetch order", error: error.message });
  }
});

// POST /api/orders - Create new order
router.post("/", async (req: any, res) => {
  try {
    const userId = req.user.id;
    const {
      restaurantId,
      items,
      addressId,
      paymentMethod,
      deliveryInstructions,
      promoCode
    } = req.body;

    // Generate order code
    const orderCode = `ORD-${Date.now()}`;

    // Mock order creation for now
    const mockOrder = {
      id: Date.now(),
      code: orderCode,
      status: "PENDING",
      totalAmount: 25.98,
      deliveryFee: 2.99,
      serviceFee: 1.99,
      createdAt: new Date(),
      estimatedDeliveryTime: "25-35 min",
      restaurant: {
        id: restaurantId,
        name: "Mock Restaurant"
      },
      items: items || [],
      address: {
        id: addressId,
        label: "Home",
        address: "Mock Address"
      },
      paymentMethod,
      deliveryInstructions: deliveryInstructions || ""
    };

    res.status(201).json(mockOrder);
  } catch (error: any) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
});

// GET /api/orders/:id/track - Track order status
router.get("/:id/track", async (req: any, res) => {
  try {
    const userId = req.user.id;
    const orderId = parseInt(req.params.id);

    // Mock tracking data
    const mockTracking = {
      orderId,
      status: "PREPARING",
      estimatedTime: "20-30 min",
      currentStep: 2,
      steps: [
        { name: "Order Placed", completed: true, timestamp: new Date() },
        { name: "Preparing", completed: true, timestamp: new Date() },
        { name: "Ready for Pickup", completed: false, timestamp: null },
        { name: "Out for Delivery", completed: false, timestamp: null },
        { name: "Delivered", completed: false, timestamp: null }
      ],
      rider: {
        name: "John Doe",
        phone: "+1234567890",
        rating: 4.8
      }
    };

    res.json(mockTracking);
  } catch (error: any) {
    console.error("Error tracking order:", error);
    res.status(500).json({ message: "Failed to track order", error: error.message });
  }
});

export default router;