import mongoose, { Document, Schema } from "mongoose";

interface IAnswer extends Document {
    description: string,
    response: string,
    questionId: Schema.Types.ObjectId,
    optionId: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId
}

const AnswerSchema: Schema<IAnswer> = new Schema({
    description: { type: String, required: true },
    response: { type: String, required: false },
    questionId: { type: Schema.Types.ObjectId, ref: "Question", required: true },
    optionId: { type: Schema.Types.ObjectId, ref: "Option", required: false },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
})

const Answer = mongoose.model<IAnswer>("Answer", AnswerSchema);

export default Answer;
export { IAnswer };