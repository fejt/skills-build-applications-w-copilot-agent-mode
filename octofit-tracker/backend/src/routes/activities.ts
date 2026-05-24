import { Router } from 'express';
import Activity from '../models/activity';

const router = Router();

router.get('/', async (req, res) => {
  const docs = await Activity.find().populate('user').lean();
  res.json(docs.map((d) => ({ id: d._id, type: d.type, distanceKm: d.distanceKm, durationMinutes: d.durationMinutes, calories: d.calories, user: d.user })));
});

router.post('/', async (req, res) => {
  const payload = req.body;
  const a = new Activity({ user: payload.user, type: payload.type || 'unknown', distanceKm: payload.distanceKm, durationMinutes: payload.durationMinutes, calories: payload.calories });
  await a.save();
  res.status(201).json({ id: a._id, type: a.type, distanceKm: a.distanceKm, durationMinutes: a.durationMinutes, calories: a.calories, user: a.user });
});

export default router;
