"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const activities = [
    { id: 'a1', type: 'run', durationMinutes: 30, userId: '1' },
];
router.get('/', (req, res) => res.json(activities));
router.post('/', (req, res) => {
    const payload = req.body;
    const id = String(Date.now());
    const a = { id, type: payload.type || 'unknown', durationMinutes: payload.durationMinutes, userId: payload.userId };
    activities.push(a);
    res.status(201).json(a);
});
exports.default = router;
