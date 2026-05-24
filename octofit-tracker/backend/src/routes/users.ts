import { Router } from 'express';
import User from '../models/user';

const router = Router();

router.get('/', async (req, res) => {
  const docs = await User.find().lean();
  res.json(docs.map((d) => ({ id: d._id, name: d.name, email: d.email, avatarUrl: d.avatarUrl })));
});

router.get('/:id', async (req, res) => {
  const doc = await User.findById(req.params.id).lean();
  if (!doc) return res.status(404).json({ error: 'not found' });
  res.json({ id: doc._id, name: doc.name, email: doc.email, avatarUrl: doc.avatarUrl });
});

router.post('/', async (req, res) => {
  const payload = req.body;
  const u = new User({ name: payload.name || 'Unnamed', email: payload.email || `user+${Date.now()}@example.com`, avatarUrl: payload.avatarUrl });
  await u.save();
  res.status(201).json({ id: u._id, name: u.name, email: u.email, avatarUrl: u.avatarUrl });
});

export default router;
