"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const admin_1 = __importDefault(require("./routes/admin"));
const user_1 = __importDefault(require("./routes/user"));
const restaurant_1 = __importDefault(require("./routes/restaurant"));
const rider_1 = __importDefault(require("./routes/rider"));
const rider_dashboard_1 = __importDefault(require("./routes/rider.dashboard"));
console.log("🔥 server.ts is running...");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/test", (req, res) => {
    console.log("🔥 /test route was called");
    res.send("✅ Express works");
});
app.use("/api/admin", admin_1.default);
app.use("/api/user", user_1.default);
app.use("/api/restaurant", restaurant_1.default);
app.use("/api/rider", rider_1.default);
app.use("/api/rider", rider_dashboard_1.default); // under the same /rider base path
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
