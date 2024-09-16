import mongoose, { Document, Schema } from "mongoose";

interface IUser {
    fullname: string,
    email: string,
    password: string,
    role: number
}

const UserSchema: Schema<IUser> = new Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, required: true }
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;