"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../config/db"));
const router = (0, express_1.Router)();
router.get('/db-test', async (req, res) => {
    try {
        // This just fetches one user (or nothing)
        const user = await db_1.default.user.findFirst();
        res.json({ message: 'Database connected!', user });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Database connection failed!' });
    }
});
exports.default = router;
