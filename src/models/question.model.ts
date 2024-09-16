import mongoose, { Document, Schema } from "mongoose";

interface IQuestion extends Document {
    title: string,
    type: Number,
    formId: Schema.Types.ObjectId
}

const QuestionSchema: Schema<IQuestion> = new Schema({
    title: { type: String, required: true },
    type: { type: Number, required: true },
    formId: { type: Schema.Types.ObjectId, ref: "Form", required: true }
})

const Question = mongoose.model<IQuestion>("Question", QuestionSchema);

export default Question;
export { IQuestion };