import mongoose, { Document, Schema } from "mongoose";

interface IAnswer extends Document {
    questionId: Schema.Types.ObjectId,
    optionId: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId
}

const AnswerSchema: Schema<IAnswer> = new Schema({
    questionId: { type: Schema.Types.ObjectId, ref: "Question", required: true },
    optionId: { type: Schema.Types.ObjectId, ref: "Option", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
})

const Answer = mongoose.model<IAnswer>("Answer", AnswerSchema);

export default Answer;
export { IAnswer };