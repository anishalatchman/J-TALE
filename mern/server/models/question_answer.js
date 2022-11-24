import mongoose from "mongoose";
//Creation of the QA entity
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
