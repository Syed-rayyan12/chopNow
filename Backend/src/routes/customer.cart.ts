import { Router } from "express";
import prisma from "../config/db";
import { authenticate } from "../middlewares/auth";

const router = Router();

// All cart routes require authentication
router.use(authenticate(["USER"]));

// GET /api/cart - Get user's cart
router.get("/", async (req: any, res) => {
  try {
    const userId = req.user.id;

    // For now, return mock cart data since CartItem model isn't migrated yet
    const mockCartItems = [
      {
        id: 1,
        menuItem: {
          id: 1,
          name: "Margherita Pizza",
          price: 12.99,
          image: "/pizza.png"
        },
        quantity: 2,
        totalPrice: 25.98,
        customizations: {}
      }
    ];

    const subtotal = mockCartItems.reduce((sum, item) => sum + item.totalPrice, 0);

    res.json({
      items: mockCartItems,
      subtotal,
      total: subtotal
    });
  } catch (error: any) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Failed to fetch cart", error: error.message });
  }
});

// POST /api/cart - Add item to cart
router.post("/", async (req: any, res) => {
  try {
    const userId = req.user.id;
    const { menuItemId, quantity, customizations, specialInstructions } = req.body;

    // Mock response for now
    const newCartItem = {
      id: Date.now(),
      menuItem: {
        id: menuItemId,
        name: "Mock Item",
        price: 10.99
      },
      quantity,
      totalPrice: quantity * 10.99,
      customizations: customizations || {},
      specialInstructions: specialInstructions || ""
    };

    res.status(201).json(newCartItem);
  } catch (error: any) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Failed to add item to cart", error: error.message });
  }
});

// PUT /api/cart/:itemId - Update cart item quantity
router.put("/:itemId", async (req: any, res) => {
  try {
    const userId = req.user.id;
    const itemId = parseInt(req.params.itemId);
    const { quantity } = req.body;

    // Mock response for now
    const updatedItem = {
      id: itemId,
      quantity,
      totalPrice: quantity * 10.99
    };

    res.json(updatedItem);
  } catch (error: any) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ message: "Failed to update cart item", error: error.message });
  }
});

// DELETE /api/cart/:itemId - Remove item from cart
router.delete("/:itemId", async (req: any, res) => {
  try {
    const userId = req.user.id;
    const itemId = parseInt(req.params.itemId);

    // Mock response for now
    res.json({ message: "Item removed from cart" });
  } catch (error: any) {
    console.error("Error removing cart item:", error);
    res.status(500).json({ message: "Failed to remove cart item", error: error.message });
  }
});

// DELETE /api/cart - Clear entire cart
router.delete("/", async (req: any, res) => {
  try {
    const userId = req.user.id;

    // Mock response for now
    res.json({ message: "Cart cleared" });
  } catch (error: any) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Failed to clear cart", error: error.message });
  }
});

export default router;