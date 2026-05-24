"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const workouts = [
    { id: 'w1', userId: '1', activities: ['a1'], notes: 'Morning run' },
];
router.get('/', (req, res) => res.json(workouts));
router.post('/', (req, res) => {
    const payload = req.body;
    const id = String(Date.now());
    const w = { id, userId: payload.userId, activities: payload.activities || [], notes: payload.notes };
    workouts.push(w);
    res.status(201).json(w);
});
exports.default = router;
