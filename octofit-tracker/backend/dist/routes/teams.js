"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const teams = [
    { id: '1', name: 'Red Rockets', members: ['1', '2'] },
];
router.get('/', (req, res) => res.json(teams));
router.get('/:id', (req, res) => {
    const t = teams.find((x) => x.id === req.params.id);
    if (!t)
        return res.status(404).json({ error: 'not found' });
    res.json(t);
});
router.post('/', (req, res) => {
    const payload = req.body;
    const id = String(Date.now());
    const t = { id, name: payload.name || 'New Team', members: payload.members || [] };
    teams.push(t);
    res.status(201).json(t);
});
exports.default = router;
