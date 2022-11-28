import mongoose from "mongoose";
//Creation of the Transcript entity
const Schema = mongoose.Schema;

const transcriptSchema = new Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  data: {
    type: mongoose.SchemaTypes.Mixed,
    required: true,
    unique: true,
    trim: true,
  },
});

const Transcript = mongoose.model("transcript", transcriptSchema);

export default Transcript;
