"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endOfWeek = exports.startOfWeek = exports.endOfToday = exports.startOfToday = void 0;
// src/utils/dates.ts
const startOfToday = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
};
exports.startOfToday = startOfToday;
const endOfToday = () => {
    const d = new Date();
    d.setHours(23, 59, 59, 999);
    return d;
};
exports.endOfToday = endOfToday;
const startOfWeek = () => {
    const d = new Date();
    const day = d.getDay(); // 0=Sun ... 6=Sat
    const diffToMonday = (day + 6) % 7; // Monday as start
    d.setDate(d.getDate() - diffToMonday);
    d.setHours(0, 0, 0, 0);
    return d;
};
exports.startOfWeek = startOfWeek;
const endOfWeek = () => {
    const s = (0, exports.startOfWeek)();
    const e = new Date(s);
    e.setDate(e.getDate() + 6);
    e.setHours(23, 59, 59, 999);
    return e;
};
exports.endOfWeek = endOfWeek;
