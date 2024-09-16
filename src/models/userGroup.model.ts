import mongoose, { Document, Schema } from "mongoose";

interface IUserGroup {
    userId: string,
    groupId: string
}

const UserGroupSchema: Schema<IUserGroup> = new Schema({
    userId: { type: String, required: true},
    groupId: { type: String,  required: true }
})

const UserGroup = mongoose.model<IUserGroup>('UserGroup', UserGroupSchema);

export default UserGroup;