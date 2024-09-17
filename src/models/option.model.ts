import mongoose, { Document, Schema } from "mongoose";

interface IOption extends Document {
    description: string,
    questionId: Schema.Types.ObjectId,
    isRight: boolean 
}

const OptionSchema: Schema<IOption> = new Schema({
    description: { type: String, required: true },
    questionId: { type: Schema.Types.ObjectId, ref: "Option", required: true },
    isRight: { type: Boolean, default: false }
})

const Option = mongoose.model<IOption>("Option", OptionSchema);

export default Option;
export { IOption };