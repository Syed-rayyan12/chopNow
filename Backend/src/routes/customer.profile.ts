import { Router } from "express";
import prisma from "../config/db";
import { authenticate } from "../middlewares/auth";

const router = Router();

// All profile routes require authentication
router.use(authenticate(["USER"]));

// GET /api/user/profile - Get user profile
router.get("/profile", async (req: any, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error: any) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Failed to fetch profile", error: error.message });
  }
});

// PUT /api/user/profile - Update user profile
router.put("/profile", async (req: any, res) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, phone } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        phone
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true
      }
    });

    res.json({ user: updatedUser });
  } catch (error: any) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Failed to update profile", error: error.message });
  }
});

// GET /api/user/addresses - Get user's saved addresses
router.get("/addresses", async (req: any, res) => {
  try {
    const userId = req.user.id;

    // For now, return mock addresses since Address model isn't migrated yet
    const mockAddresses = [
      {
        id: 1,
        label: "Home",
        address: "123 Main Street, Apt 4B, Downtown",
        details: "Ring doorbell twice",
        isDefault: true,
        createdAt: new Date()
      },
      {
        id: 2,
        label: "Work",
        address: "456 Business Ave, Suite 200, Business District",
        details: "Leave with reception",
        isDefault: false,
        createdAt: new Date()
      }
    ];

    res.json({ addresses: mockAddresses });
  } catch (error: any) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ message: "Failed to fetch addresses", error: error.message });
  }
});

// POST /api/user/addresses - Add new address
router.post("/addresses", async (req: any, res) => {
  try {
    const userId = req.user.id;
    const { label, address, city, postalCode, details, latitude, longitude, isDefault } = req.body;

    // Mock response for now
    const newAddress = {
      id: Date.now(),
      userId,
      label,
      address,
      city: city || null,
      postalCode: postalCode || null,
      details: details || null,
      latitude: latitude || null,
      longitude: longitude || null,
      isDefault: isDefault || false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    res.status(201).json(newAddress);
  } catch (error: any) {
    console.error("Error creating address:", error);
    res.status(500).json({ message: "Failed to create address", error: error.message });
  }
});

// PUT /api/user/addresses/:id - Update address
router.put("/addresses/:id", async (req: any, res) => {
  try {
    const userId = req.user.id;
    const addressId = parseInt(req.params.id);
    const { label, address, city, postalCode, details, latitude, longitude, isDefault } = req.body;

    // Mock response for now
    const updatedAddress = {
      id: addressId,
      userId,
      label,
      address,
      city: city || null,
      postalCode: postalCode || null,
      details: details || null,
      latitude: latitude || null,
      longitude: longitude || null,
      isDefault: isDefault || false,
      updatedAt: new Date()
    };

    res.json(updatedAddress);
  } catch (error: any) {
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Failed to update address", error: error.message });
  }
});

// DELETE /api/user/addresses/:id - Delete address
router.delete("/addresses/:id", async (req: any, res) => {
  try {
    const userId = req.user.id;
    const addressId = parseInt(req.params.id);

    // Mock response for now
    res.json({ message: "Address deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting address:", error);
    res.status(500).json({ message: "Failed to delete address", error: error.message });
  }
});

// PUT /api/user/addresses/:id/default - Set address as default
router.put("/addresses/:id/default", async (req: any, res) => {
  try {
    const userId = req.user.id;
    const addressId = parseInt(req.params.id);

    // Mock response for now
    const updatedAddress = {
      id: addressId,
      isDefault: true,
      updatedAt: new Date()
    };

    res.json(updatedAddress);
  } catch (error: any) {
    console.error("Error setting default address:", error);
    res.status(500).json({ message: "Failed to set default address", error: error.message });
  }
});

export default router;