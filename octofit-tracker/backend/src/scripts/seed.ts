/**
 * Seed the octofit_db database with test data
 *
 * This script connects to mongodb://localhost:27017/octofit_db and inserts
 * realistic sample documents for users, teams, activities, leaderboard and workouts.
 */

import mongoose from 'mongoose';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import Leaderboard from '../models/leaderboard';
import Workout from '../models/workout';

const MONGO = 'mongodb://localhost:27017/octofit_db';

async function main() {
  console.log('Seed the octofit_db database with test data');
  await mongoose.connect(MONGO);
  console.log('Connected to', MONGO);

  // Clear existing collections (if present)
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  // Create users
  const users = await User.create([
    { name: 'Alice Johnson', email: 'alice.j@example.com', avatarUrl: 'https://i.pravatar.cc/150?img=1' },
    { name: 'Bob Martinez', email: 'bob.m@example.com', avatarUrl: 'https://i.pravatar.cc/150?img=2' },
    { name: 'Carla Gomez', email: 'carla.g@example.com', avatarUrl: 'https://i.pravatar.cc/150?img=3' },
  ]);

  // Create teams
  const teams = await Team.create([
    { name: 'Red Rockets', members: [users[0]._id, users[1]._id] },
    { name: 'Blue Whales', members: [users[2]._id] },
  ]);

  // Create activities
  const activities = await Activity.create([
    { user: users[0]._id, type: 'run', distanceKm: 5.2, durationMinutes: 28, calories: 320 },
    { user: users[1]._id, type: 'bike', distanceKm: 12.0, durationMinutes: 45, calories: 540 },
    { user: users[2]._id, type: 'swim', distanceKm: 1.0, durationMinutes: 30, calories: 250 },
  ]);

  // Create workouts
  const workouts = await Workout.create([
    { user: users[0]._id, activities: [activities[0]._id], notes: 'Tempo run' },
    { user: users[1]._id, activities: [activities[1]._id], notes: 'Evening ride' },
  ]);

  // Create leaderboard entries
  const leaderboard = await Leaderboard.create([
    { user: users[0]._id, score: 420 },
    { user: users[1]._id, score: 375 },
    { user: users[2]._id, score: 310 },
  ]);

  console.log('Seed complete:');
  console.log(`  users: ${users.length}`);
  console.log(`  teams: ${teams.length}`);
  console.log(`  activities: ${activities.length}`);
  console.log(`  workouts: ${workouts.length}`);
  console.log(`  leaderboard entries: ${leaderboard.length}`);

  await mongoose.disconnect();
  console.log('Disconnected.');
}

main().catch((err) => {
  console.error('Seed failed', err);
  process.exit(1);
});
