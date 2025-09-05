"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../config/db"));
const router = (0, express_1.Router)();
const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";
console.log("✅ auth.ts loaded");
// Ping route
router.get("/ping", (req, res) => {
    res.send("Auth router working ✅");
});
// Signup Route
router.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, email, password, phone } = req.body;
        // Validate inputs
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        // Check if email or phone is already used
        const existingUser = await db_1.default.user.findFirst({
            where: {
                OR: [{ email }, { phone }],
            },
        });
        if (existingUser) {
            return res.status(400).json({ message: "Email or phone already in use" });
        }
        // Hash password
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Create user
        const user = await db_1.default.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                phone: phone || null,
                role: "RIDER", // or "USER", depending on your role structure
            },
        });
        // Remove password from returned user
        const { password: _, ...userWithoutPassword } = user;
        // Generate JWT
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(201).json({ user: userWithoutPassword, token });
    }
    catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ message: "Signup failed", error: err.message });
    }
});
// Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate inputs
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        // Find user
        const user = await db_1.default.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Compare password
        const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid password" });
        }
        // Remove password before sending response
        const { password: _, ...userWithoutPassword } = user;
        // Generate JWT
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, JWT_SECRET, {
            expiresIn: "7d",
        });
        res.json({ user: userWithoutPassword, token });
    }
    catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Login failed", error: err.message });
    }
});
exports.default = router;
