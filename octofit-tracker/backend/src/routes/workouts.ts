import { Router } from 'express';
import Workout from '../models/workout';

const router = Router();

router.get('/', async (req, res) => {
  const docs = await Workout.find().populate('activities').populate('user').lean();
  res.json(docs.map((d) => ({ id: d._id, user: d.user, activities: d.activities, notes: d.notes, date: d.date })));
});

router.post('/', async (req, res) => {
  const payload = req.body;
  const w = new Workout({ user: payload.user, activities: payload.activities || [], notes: payload.notes });
  await w.save();
  res.status(201).json({ id: w._id, user: w.user, activities: w.activities, notes: w.notes });
});

export default router;
