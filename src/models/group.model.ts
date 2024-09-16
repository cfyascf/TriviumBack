import mongoose, { Document, Schema, StringExpressionOperatorReturningBoolean } from "mongoose";

interface IGroup {
    name: string
}

const GroupSchema: Schema<IGroup> = new Schema({
    name: { type: String, required: true}
});

const Group = mongoose.model<IGroup>('Group', GroupSchema);

export default Group;