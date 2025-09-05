import { Router } from "express";
import prisma from "../config/db";

const router = Router();

// GET /api/restaurants - List all restaurants
router.get("/", async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany({
      select: {
        id: true,
        name: true,
        phone: true,
        address: true,
        createdAt: true
      }
    });

    res.json({
      restaurants,
      pagination: {
        page: 1,
        limit: restaurants.length,
        total: restaurants.length,
        pages: 1
      }
    });
  } catch (error: any) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ message: "Failed to fetch restaurants", error: error.message });
  }
});

// GET /api/restaurants/featured - Get featured restaurants (for now, return first 8)
router.get("/featured", async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany({
      take: 8,
      select: {
        id: true,
        name: true,
        phone: true,
        address: true
      }
    });

    res.json(restaurants);
  } catch (error: any) {
    console.error("Error fetching featured restaurants:", error);
    res.status(500).json({ message: "Failed to fetch featured restaurants", error: error.message });
  }
});

// GET /api/restaurants/:id - Get restaurant details
router.get("/:id", async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.id);

    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId }
    });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json(restaurant);
  } catch (error: any) {
    console.error("Error fetching restaurant:", error);
    res.status(500).json({ message: "Failed to fetch restaurant", error: error.message });
  }
});

export default router;