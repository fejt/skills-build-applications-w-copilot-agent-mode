import express from 'express';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db';

// Codespaces-aware API base URL. If running inside a Codespace, construct the
// preview hostname so frontend can call the API through the preview URL.
const CODESPACE = process.env.CODESPACE_NAME;
const API_BASE = CODESPACE ? `https://${CODESPACE}-8000.githubpreview.dev` : `http://localhost:${PORT}`;

app.use(express.json());

// Mount logic tier routers
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/api', (req, res) => {
  res.json({ status: 'ok', apiBase: API_BASE, env: process.env.NODE_ENV || 'development' });
});

import connectDatabase from './config/database';

async function start() {
  try {
    await connectDatabase(MONGO_URI);
    console.log('Connected to MongoDB');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server listening on ${API_BASE}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
