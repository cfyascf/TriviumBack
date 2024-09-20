import mongoose, { Document, Schema } from "mongoose";

interface IUserMatch extends Document {
    userId: Schema.Types.ObjectId,
    matchId: Schema.Types.ObjectId
}

const UserMatchSchema: Schema<IUserMatch> = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true},
    matchId: { type: Schema.Types.ObjectId, ref: "Match",  required: true }
})

const UserMatch = mongoose.model<IUserMatch>('UserMatch', UserMatchSchema);

export default UserMatch;
export { IUserMatch };