import mongoose, { Document, Schema } from "mongoose";

interface IGroup extends Document {
    name: string
}

const GroupSchema: Schema<IGroup> = new Schema({
    name: { type: String, required: true}
});

const Group = mongoose.model<IGroup>('Group', GroupSchema);

export default Group;
export { IGroup };