import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IActivity extends Document {
  user: Types.ObjectId;
  type: string;
  distanceKm?: number;
  durationMinutes?: number;
  calories?: number;
  date: Date;
}

const ActivitySchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  distanceKm: { type: Number },
  durationMinutes: { type: Number },
  calories: { type: Number },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IActivity>('Activity', ActivitySchema);
