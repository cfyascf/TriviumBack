import mongoose, { Document, Schema } from "mongoose";

interface IForm extends Document {
    title: string,
    description: string,
}

const FormSchema: Schema<IForm> = new Schema({
    title: { type: String, required: true },
    description:  { type: String, required: true },
})

const Form = mongoose.model<IForm>("Form", FormSchema);

export default Form;
export { IForm };