import mongoose, { Document, Schema } from "mongoose";
import User from "./user.model";
import Group from "./group.model";

interface IUserGroup extends Document {
    userId: Schema.Types.ObjectId,
    groupId: Schema.Types.ObjectId
}

const UserGroupSchema: Schema<IUserGroup> = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true},
    groupId: { type: Schema.Types.ObjectId, ref: "Group",  required: true }
})

const UserGroup = mongoose.model<IUserGroup>('UserGroup', UserGroupSchema);

export default UserGroup;
export { IUserGroup };