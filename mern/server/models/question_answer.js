import mongoose from "mongoose";

const Schema = mongoose.Schema;

const QASchema = new Schema({
  id: {
    type: String,
    require: true,
    unique: true,
  },
  question: {
    type: String,
    require: true,
  },
  question_included: {
    type: Boolean,
    require: true,
  },
  intents: [
    {
      value: { type: String },
      included: { type: Boolean },
      children: [{ type: String }],
    },
  ],
});

const QA = mongoose.model("QA", QASchema);

export default QA;
