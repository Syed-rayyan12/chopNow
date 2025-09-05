"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function connectDB() {
    try {
        await prisma.$connect();
        console.log('✅ Database connected successfully');
    }
    catch (err) {
        console.error('❌ Database connection failed', err);
    }
}
connectDB();
exports.default = prisma;
