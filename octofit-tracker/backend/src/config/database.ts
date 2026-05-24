import mongoose from 'mongoose';

// Database connection helper for the Octofit Tracker backend.
// Uses `octofit_db` as the default database when no MONGO_URI is provided.

const DEFAULT_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db';

export async function connectDatabase(uri = DEFAULT_URI) {
  await mongoose.connect(uri);
  return mongoose;
}

export default connectDatabase;
