"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_1 = require("../utils/jwt");
const router = (0, express_1.Router)();
const ADMIN_EMAIL = "admin@chopnow.com";
const ADMIN_PASSWORD = "admin123"; // hardcoded
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = (0, jwt_1.generateToken)({ email, role: "ADMIN" });
    res.json({ token });
});
exports.default = router;
