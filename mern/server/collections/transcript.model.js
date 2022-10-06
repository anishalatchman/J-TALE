const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transcriptSchema = new Schema(
  {
    transcript: {
      type: mongoose.SchemaTypes.Mixed,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transcript = mongoose.model("transcript", transcriptSchema);

module.exports = Transcript;
