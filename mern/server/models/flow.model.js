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
      type: mongoose.SchemaTypes.Mixed,
    },
  ],
  current_question: {
    type: String,
  },
});

const Flow = mongoose.model("Flow", flowschema);

export default Flow;
