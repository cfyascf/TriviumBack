import mongoose, { Document, Schema } from "mongoose";

interface IScore extends Document {
    userId: Schema.Types.ObjectId,
    matchId: Schema.Types.ObjectId,
    points: number
}

const ScoreSchema: Schema<IScore> = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    matchId: { type: Schema.Types.ObjectId, ref: "Match", required: true },
    points: { type: Number, required: true }
});

const Score = mongoose.model<IScore>('Score', ScoreSchema);

export default Score;
export { IScore };