import mongoose, { Document, Schema } from "mongoose";

interface IMatch extends Document {
    name: string,
    pin: string,
    formId: Schema.Types.ObjectId,
    admId: Schema.Types.ObjectId
}

const MatchSchema: Schema<IMatch> = new Schema({
    name: { type: String, required: true},
    pin: { type: String, required: true},
    formId: { type: Schema.Types.ObjectId, ref: "Form", required: true },
    admId: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

const Match = mongoose.model<IMatch>('Match', MatchSchema);

export default Match;
export { IMatch };