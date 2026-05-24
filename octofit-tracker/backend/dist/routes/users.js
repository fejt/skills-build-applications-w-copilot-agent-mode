"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const users = [
    { id: '1', name: 'Alice', email: 'alice@example.com' },
    { id: '2', name: 'Bob', email: 'bob@example.com' },
];
router.get('/', (req, res) => {
    res.json(users);
});
router.get('/:id', (req, res) => {
    const u = users.find((x) => x.id === req.params.id);
    if (!u)
        return res.status(404).json({ error: 'not found' });
    res.json(u);
});
router.post('/', (req, res) => {
    const payload = req.body;
    const id = String(Date.now());
    const u = { id, name: payload.name || 'Unnamed', email: payload.email };
    users.push(u);
    res.status(201).json(u);
});
exports.default = router;
