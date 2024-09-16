import mongoose, { Document, Schema } from "mongoose";

interface IForm extends Document {
    title: string,
    description: string,
    groupId: Schema.Types.ObjectId
}

const FormSchema: Schema<IForm> = new Schema({
    title: { type: String, required: true },
    description:  { type: String, required: true },
    groupId: { type: Schema.Types.ObjectId, ref: "Group", required: true }
})

const Form = mongoose.model<IForm>("Form", FormSchema);

export default Form;
export { IForm };