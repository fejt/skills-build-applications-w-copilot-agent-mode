import { Router } from 'express';
import Team from '../models/team';
import User from '../models/user';

const router = Router();

router.get('/', async (req, res) => {
  const docs = await Team.find().populate('members').lean();
  res.json(docs.map((d) => ({ id: d._id, name: d.name, members: d.members })));
});

router.get('/:id', async (req, res) => {
  const doc = await Team.findById(req.params.id).populate('members').lean();
  if (!doc) return res.status(404).json({ error: 'not found' });
  res.json({ id: doc._id, name: doc.name, members: doc.members });
});

router.post('/', async (req, res) => {
  const payload = req.body;
  const members = payload.members || [];
  // ensure member IDs exist
  await User.find({ _id: { $in: members } });
  const t = new Team({ name: payload.name || 'New Team', members });
  await t.save();
  res.status(201).json({ id: t._id, name: t.name, members: t.members });
});

export default router;
