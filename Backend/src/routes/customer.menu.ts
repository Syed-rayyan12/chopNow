import { Router } from "express";
import prisma from "../config/db";

const router = Router();

// GET /api/menu/:restaurantId - Get menu items for a restaurant
router.get("/:restaurantId", async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId);

    // For now, return mock menu data since MenuItem model isn't migrated yet
    const mockMenuItems = [
      {
        id: 1,
        name: "Margherita Pizza",
        description: "Fresh mozzarella, tomato sauce, basil",
        price: 12.99,
        category: "Pizza",
        image: "/pizza.png",
        isAvailable: true,
        isVegetarian: true
      },
      {
        id: 2,
        name: "Chicken Burger",
        description: "Grilled chicken breast with lettuce and mayo",
        price: 9.99,
        category: "Burgers",
        image: "/burger.png",
        isAvailable: true,
        isVegetarian: false
      },
      {
        id: 3,
        name: "Caesar Salad",
        description: "Romaine lettuce, croutons, parmesan, caesar dressing",
        price: 8.99,
        category: "Salads",
        image: "/salad.png",
        isAvailable: true,
        isVegetarian: true
      }
    ];

    res.json({
      restaurantId,
      menuItems: mockMenuItems
    });
  } catch (error: any) {
    console.error("Error fetching menu:", error);
    res.status(500).json({ message: "Failed to fetch menu", error: error.message });
  }
});

// GET /api/menu/categories/:restaurantId - Get menu categories for a restaurant
router.get("/categories/:restaurantId", async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId);

    // Mock categories for now
    const categories = [
      "Pizza",
      "Burgers",
      "Salads",
      "Pasta",
      "Desserts",
      "Drinks"
    ];

    res.json({
      restaurantId,
      categories
    });
  } catch (error: any) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Failed to fetch categories", error: error.message });
  }
});

export default router;