import mongoose from "mongoose";

const Schema = mongoose.Schema;

const flowschema = new Schema({
  name: {
    type: String,
    require: true,
  },
  questions: [
    {
      type: String,
    },
  ],
  current_question: [
    {
      type: String,
    },
  ],
});

const Flow = mongoose.model("Flow", flowschema);

export default Flow;
