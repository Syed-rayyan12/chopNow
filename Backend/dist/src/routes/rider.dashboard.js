"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/rider.dashboard.ts
const express_1 = require("express");
const db_1 = __importDefault(require("../config/db"));
const auth_1 = require("../middlewares/auth");
const dates_1 = require("../utils/dates");
const router = (0, express_1.Router)();
// All endpoints below require Rider role
router.use((0, auth_1.authenticate)(["RIDER"]));
/**
 * 1) Rider profile (greeting)
 * GET /rider/me
 */
router.get("/me", async (req, res) => {
    const riderId = req.user.id;
    const rider = await db_1.default.user.findUnique({
        where: { id: riderId },
        select: { id: true, firstName: true, lastName: true, email: true, phone: true, role: true },
    });
    res.json({ rider, greeting: `Welcome, ${rider?.firstName ?? "Rider"}` });
});
/**
 * 2) Dashboard summary cards
 * GET /rider/dashboard/summary
 * Returns: todayEarnings, ordersCompletedToday, avgRating, onlineTimeMinutesToday
 */
router.get("/dashboard/summary", async (req, res) => {
    const riderId = req.user.id;
    const todayStart = (0, dates_1.startOfToday)();
    const todayEnd = (0, dates_1.endOfToday)();
    // earnings today (sum of riderPayout on delivered orders today)
    const earningsAgg = await db_1.default.order.aggregate({
        _sum: { riderPayout: true },
        where: {
            riderId,
            status: "DELIVERED",
            deliveredAt: { gte: todayStart, lte: todayEnd },
        },
    });
    // completed orders today
    const completedCount = await db_1.default.order.count({
        where: {
            riderId,
            status: "DELIVERED",
            deliveredAt: { gte: todayStart, lte: todayEnd },
        },
    });
    // average rating overall (or restrict to this week if you want)
    const ratingAgg = await db_1.default.rating.aggregate({
        _avg: { score: true },
        where: { riderId },
    });
    // online time today (sum of session durations)
    const sessions = await db_1.default.riderOnlineSession.findMany({
        where: { riderId, startedAt: { lte: todayEnd }, OR: [{ endedAt: { gte: todayStart } }, { endedAt: null }] },
    });
    const now = new Date();
    //   const onlineMs = sessions.reduce((sum, s) => {
    //     const start = s.startedAt < todayStart ? todayStart : s.startedAt;
    //     const end = s.endedAt ?? now;
    //     const clampedEnd = end > todayEnd ? todayEnd : end;
    //     const diff = Math.max(0, clampedEnd.getTime() - start.getTime());
    //     return sum + diff;
    //   }, 0);
    const onlineMs = sessions.reduce((sum, s) => {
        const start = s.startedAt < todayStart ? todayStart : s.startedAt;
        const end = s.endedAt ?? now;
        const clampedEnd = end > todayEnd ? todayEnd : end;
        const diff = Math.max(0, clampedEnd.getTime() - start.getTime());
        return sum + diff;
    }, 0);
    res.json({
        earnings: Number(earningsAgg._sum.riderPayout ?? 0),
        completedOrders: completedCount,
        rating: Number(ratingAgg._avg.score ?? 0),
        onlineTime: `${Math.round(onlineMs / 60000)} min`,
    });
});
/**
 * 3) Active orders (ASSIGNED or PICKED_UP)
 * GET /rider/orders/active
 */
router.get("/orders/active", async (req, res) => {
    const riderId = req.user.id;
    const active = await db_1.default.order.findMany({
        where: { riderId, status: { in: ["ASSIGNED", "PICKED_UP"] } },
        orderBy: { assignedAt: "desc" },
        include: {
            restaurant: true,
            items: true,
        },
    });
    res.json(active);
});
/**
 * 4) Recent activity (last N delivered orders)
 * GET /rider/orders/recent?limit=10
 */
router.get("/orders/recent", async (req, res) => {
    const riderId = req.user.id;
    const limit = Number(req.query.limit ?? 10);
    const recent = await db_1.default.order.findMany({
        where: { riderId, status: "DELIVERED" },
        orderBy: { deliveredAt: "desc" },
        take: limit,
        include: {
            restaurant: true,
            items: true,
        },
    });
    res.json(recent);
});
/**
 * 5) Manage orders
 *    a) Active tab -> same as /orders/active
 *    b) Completed tab -> /orders/completed
 * GET /rider/orders/completed?from=ISO&to=ISO
 */
router.get("/orders/completed", async (req, res) => {
    const riderId = req.user.id;
    const from = req.query.from ? new Date(String(req.query.from)) : (0, dates_1.startOfWeek)();
    const to = req.query.to ? new Date(String(req.query.to)) : (0, dates_1.endOfWeek)();
    const completed = await db_1.default.order.findMany({
        where: {
            riderId,
            status: "DELIVERED",
            deliveredAt: { gte: from, lte: to },
        },
        orderBy: { deliveredAt: "desc" },
        include: {
            restaurant: true,
            items: true,
            ratings: true,
        },
    });
    res.json(completed);
});
/**
 * 6) Earnings overview
 * GET /rider/earnings/summary?weeklyGoal=10000
 * Returns: todayTotal, weekTotal, weeklyGoalPct, avgPerHour
 */
router.get("/earnings/summary", async (req, res) => {
    const riderId = req.user.id;
    const todayStart = (0, dates_1.startOfToday)();
    const todayEnd = (0, dates_1.endOfToday)();
    const weekStart = (0, dates_1.startOfWeek)();
    const weekEnd = (0, dates_1.endOfWeek)();
    const weeklyGoal = Number(req.query.weeklyGoal ?? 10000); // PKR or your currency
    // Today total
    const todayAgg = await db_1.default.order.aggregate({
        _sum: { riderPayout: true },
        where: { riderId, status: "DELIVERED", deliveredAt: { gte: todayStart, lte: todayEnd } },
    });
    // This week total
    const weekAgg = await db_1.default.order.aggregate({
        _sum: { riderPayout: true },
        where: { riderId, status: "DELIVERED", deliveredAt: { gte: weekStart, lte: weekEnd } },
    });
    // Active hours this week from sessions
    const sessions = await db_1.default.riderOnlineSession.findMany({
        where: { riderId, startedAt: { lte: weekEnd }, OR: [{ endedAt: { gte: weekStart } }, { endedAt: null }] },
    });
    const now = new Date();
    const ms = sessions.reduce((sum, s) => {
        const start = s.startedAt < weekStart ? weekStart : s.startedAt;
        const end = s.endedAt ?? now;
        const clampedEnd = end > weekEnd ? weekEnd : end;
        const diff = Math.max(0, clampedEnd.getTime() - start.getTime());
        return sum + diff;
    }, 0);
    const hours = ms / (1000 * 60 * 60);
    const weekTotal = Number(weekAgg._sum.riderPayout ?? 0);
    const avgPerHour = hours > 0 ? weekTotal / hours : 0;
    const weeklyGoalPct = weeklyGoal > 0 ? Math.min(100, Math.round((weekTotal / weeklyGoal) * 100)) : 0;
    res.json({
        todayTotal: Number(todayAgg._sum.riderPayout ?? 0),
        weekTotal,
        weeklyGoal,
        weeklyGoalPct,
        activeHoursThisWeek: Number(hours.toFixed(2)),
        avgPerHour: Number(avgPerHour.toFixed(2)),
    });
});
/**
 * 7) Hourly breakdown (today)
 * GET /rider/earnings/hourly
 * Returns array [{ hour: "09:00-10:00", orders: n, earnings: x }]
 */
router.get("/earnings/hourly", async (req, res) => {
    const riderId = req.user.id;
    const dayStart = (0, dates_1.startOfToday)();
    const dayEnd = (0, dates_1.endOfToday)();
    const delivered = await db_1.default.order.findMany({
        where: { riderId, status: "DELIVERED", deliveredAt: { gte: dayStart, lte: dayEnd } },
        select: { deliveredAt: true, riderPayout: true },
        orderBy: { deliveredAt: "asc" },
    });
    // group by hour
    const buckets = {};
    for (const o of delivered) {
        const d = o.deliveredAt;
        const hourStart = new Date(d);
        hourStart.setMinutes(0, 0, 0);
        const label = `${hourStart.getHours().toString().padStart(2, "0")}:00-${(hourStart.getHours() + 1)
            .toString()
            .padStart(2, "0")}:00`;
        if (!buckets[label])
            buckets[label] = { orders: 0, earnings: 0 };
        buckets[label].orders += 1;
        buckets[label].earnings += Number(o.riderPayout);
    }
    const result = Object.entries(buckets).map(([hour, v]) => ({ hour, ...v }));
    res.json(result);
});
/**
 * 8) Weekly breakdown (Mon–Sun)
 * GET /rider/earnings/weekly
 * Returns array [{ day: "Mon", orders: n, earnings: x }]
 */
router.get("/earnings/weekly", async (req, res) => {
    const riderId = req.user.id;
    const weekStart = (0, dates_1.startOfWeek)();
    const weekEnd = (0, dates_1.endOfWeek)();
    const delivered = await db_1.default.order.findMany({
        where: { riderId, status: "DELIVERED", deliveredAt: { gte: weekStart, lte: weekEnd } },
        select: { deliveredAt: true, riderPayout: true },
        orderBy: { deliveredAt: "asc" },
    });
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const buckets = {
        Mon: { orders: 0, earnings: 0 },
        Tue: { orders: 0, earnings: 0 },
        Wed: { orders: 0, earnings: 0 },
        Thu: { orders: 0, earnings: 0 },
        Fri: { orders: 0, earnings: 0 },
        Sat: { orders: 0, earnings: 0 },
        Sun: { orders: 0, earnings: 0 },
    };
    for (const o of delivered) {
        const dName = weekday[o.deliveredAt.getDay()];
        const key = dName;
        if (!buckets[key])
            buckets[key] = { orders: 0, earnings: 0 };
        buckets[key].orders += 1;
        buckets[key].earnings += Number(o.riderPayout);
    }
    const orderedKeys = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const result = orderedKeys.map((k) => ({ day: k, ...buckets[k] }));
    res.json(result);
});
/**
 * Online status controls (optional helpers for frontend)
 * POST /rider/status/online   -> starts a session
 * POST /rider/status/offline  -> ends the latest open session
 */
router.post("/status/online", async (req, res) => {
    const riderId = req.user.id;
    const open = await db_1.default.riderOnlineSession.findFirst({
        where: { riderId, endedAt: null },
        orderBy: { startedAt: "desc" },
    });
    if (open)
        return res.status(400).json({ message: "Already online" });
    const session = await db_1.default.riderOnlineSession.create({
        data: { riderId },
    });
    res.json(session);
});
router.post("/status/offline", async (req, res) => {
    const riderId = req.user.id;
    const open = await db_1.default.riderOnlineSession.findFirst({
        where: { riderId, endedAt: null },
        orderBy: { startedAt: "desc" },
    });
    if (!open)
        return res.status(400).json({ message: "No active session" });
    const closed = await db_1.default.riderOnlineSession.update({
        where: { id: open.id },
        data: { endedAt: new Date() },
    });
    res.json(closed);
});
/**
 * Update order status
 * POST /rider/orders/:orderId/status
 * Body: { status: "PICKED_UP" | "DELIVERED" }
 */
router.post("/orders/:orderId/status", async (req, res) => {
    const riderId = req.user.id;
    const orderId = parseInt(req.params.orderId);
    const { status } = req.body;
    if (!["PICKED_UP", "DELIVERED"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
    }
    try {
        // Find the order and ensure it belongs to this rider
        const order = await db_1.default.order.findFirst({
            where: { id: orderId, riderId },
        });
        if (!order) {
            return res.status(404).json({ message: "Order not found or not assigned to you" });
        }
        // Validate status transitions
        if (status === "PICKED_UP" && order.status !== "ASSIGNED") {
            return res.status(400).json({ message: "Order must be ASSIGNED to pick up" });
        }
        if (status === "DELIVERED" && order.status !== "PICKED_UP") {
            return res.status(400).json({ message: "Order must be PICKED_UP to deliver" });
        }
        // Update the order
        const updateData = { status };
        if (status === "PICKED_UP") {
            updateData.pickedUpAt = new Date();
        }
        else if (status === "DELIVERED") {
            updateData.deliveredAt = new Date();
        }
        const updatedOrder = await db_1.default.order.update({
            where: { id: orderId },
            data: updateData,
            include: {
                restaurant: true,
                items: true,
            },
        });
        res.json(updatedOrder);
    }
    catch (err) {
        console.error("Status update error:", err);
        res.status(500).json({ message: "Failed to update order status", error: err.message });
    }
});
exports.default = router;
