import { Router } from "express";
import bcrypt from "bcryptjs";
import prisma from "../config/db";
import jwt from "jsonwebtoken";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";

console.log("✅ auth.ts loaded");

// Ping route to test router
router.get("/ping", (req, res) => {
  res.send("Auth router working ✅");
});

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if email or phone already exists
    const existing = await prisma.user.findFirst({
      where: { OR: [{ email }, { phone }] },
    });
    if (existing) return res.status(400).json({ message: "Email or phone already in use" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone: phone || null,
        role: "USER",
      },
    });

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = user;

    // Generate JWT
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ user: userWithoutPassword, token });
  } catch (err: any) {
  console.error("Signup error:", err);
  res.status(500).json({ message: "Signup failed", error: err.message });
}
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid password" });

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = user;

    // Generate JWT
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ user: userWithoutPassword, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
});

export default router;
