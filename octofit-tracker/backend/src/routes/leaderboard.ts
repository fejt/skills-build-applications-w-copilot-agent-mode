import { Router } from 'express';
import Leaderboard from '../models/leaderboard';

const router = Router();

router.get('/', async (req, res) => {
  const docs = await Leaderboard.find().populate('user').sort({ score: -1 }).lean();
  res.json(docs.map((d) => ({ user: d.user, score: d.score })));
});

export default router;
