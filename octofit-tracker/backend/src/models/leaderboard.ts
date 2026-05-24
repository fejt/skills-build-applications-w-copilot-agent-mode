import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  user: Types.ObjectId;
  score: number;
  updatedAt: Date;
}

const LeaderboardSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true, default: 0 },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<ILeaderboardEntry>('Leaderboard', LeaderboardSchema);
