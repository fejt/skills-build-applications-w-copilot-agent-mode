import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IWorkout extends Document {
  user: Types.ObjectId;
  activities: Types.ObjectId[];
  notes?: string;
  date: Date;
}

const WorkoutSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  activities: [{ type: Schema.Types.ObjectId, ref: 'Activity' }],
  notes: { type: String },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IWorkout>('Workout', WorkoutSchema);
