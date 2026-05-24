"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const leaderboard = [
    { userId: '1', score: 120 },
    { userId: '2', score: 95 },
];
router.get('/', (req, res) => {
    // Return sorted leaderboard
    const sorted = [...leaderboard].sort((a, b) => b.score - a.score);
    res.json(sorted);
});
exports.default = router;
