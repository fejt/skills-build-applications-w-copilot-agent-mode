import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  members: Types.ObjectId[];
  createdAt: Date;
}

const TeamSchema: Schema = new Schema({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ITeam>('Team', TeamSchema);
