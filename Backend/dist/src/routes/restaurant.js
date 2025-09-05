"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("../config/db"));
const jwt_1 = require("../utils/jwt");
const router = (0, express_1.Router)();
router.post("/signup", async (req, res) => {
    const { firstName, lastName, email, password, phone } = req.body;
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const restaurant = await db_1.default.user.create({
        data: { firstName, lastName, email, password: hashedPassword, phone, role: "RESTAURANT" },
    });
    res.json(restaurant);
});
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const restaurant = await db_1.default.user.findUnique({ where: { email } });
    if (!restaurant)
        return res.status(404).json({ message: "Not found" });
    const valid = await bcryptjs_1.default.compare(password, restaurant.password);
    if (!valid)
        return res.status(401).json({ message: "Invalid password" });
    const token = (0, jwt_1.generateToken)({ id: restaurant.id, role: restaurant.role });
    res.json({ token });
});
exports.default = router;
