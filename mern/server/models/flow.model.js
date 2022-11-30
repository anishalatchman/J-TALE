import mongoose from "mongoose";
//Creation of the Flow entity
const Schema = mongoose.Schema;

const flowschema = new Schema({
  name: {
    type: String,
    require: true,
  },
  questions: [
    {
      type: String,
      require: true,
    },
  ],
  allQuestions: [
    {
      type: String,
      require: true,
    },
  ],
  current_question: {
    type: String,
  },
  transcriptID: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
});

const Flow = mongoose.model("Flow", flowschema);

export default Flow;
