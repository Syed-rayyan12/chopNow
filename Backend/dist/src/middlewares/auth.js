"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwt_1 = require("../utils/jwt");
const authenticate = (roles = []) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }
        const token = authHeader.split(" ")[1];
        try {
            const decoded = (0, jwt_1.verifyToken)(token);
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({ message: "Forbidden" });
            }
            req.user = decoded;
            next();
        }
        catch (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
    };
};
exports.authenticate = authenticate;
