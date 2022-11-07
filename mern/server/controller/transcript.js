import Transcript from "../models/transcript.model.js";
import asyncHandler from "express-async-handler";

export const getTranscript = asyncHandler(async (req, res) => {
  try {
    const transcript = await Transcript.findById(req.params.id);
    res.status(200).json(transcript);
  } catch (error) {
    res.status(400).json("No Transcripts Exist");
  }
});

export const createTranscript = asyncHandler(async (req, res) => {
  const data = req.body.data;
  const name = req.body.name;

  const transcriptExists = await Transcript.findOne({ name });

  if (transcriptExists) {
    res.status(400).json("Card already exists");
  }
  const transcript = await Transcript.create({
    name,
    data,
  });
  if (transcript) {
    res.status(200).json({
      id: transcript.id,
      name: transcript.name
    });
  } else {
    res.status(400).json("Invalid transcript Data");
  }
});

export const createTranscriptAPI = asyncHandler(async (req, res) => {
  const VOICEFLOW_API_KEY = process.env.VOICEFLOW_API_KEY;
  const VERSION_ID = process.env.VERSION_ID;
  const url = `https://api-dm-test.voiceflow.fr/exportraw/${VOICEFLOW_API_KEY}?versionID=${VERSION_ID}`;

  let vf_transcript;

  try {
    new Transcript({ name: req.body.name, data: body.toString() })
      .save()
      .then(() => res.json({ id }));
  } catch (error) {
    res.status(400).json("Error: " + err);

    // Reporting the Error Message
    if (err) {
      console.log("Error Inserting New Data");
      if (err.name == "ValidationError") {
        for (field in err.errors) {
          console.log(err.errors[field].message);
        }
      }
    }
  }
});

export const deleteTranscript = asyncHandler(async (req, res) => {
  try {
    const transcript = await Transcript.findByIdAndDelete(req.params.id);
    res.status(200).json(transcript);
  } catch (error) {
    res.status(400).json("Unable to Delete Transcript");
  }
});

export const updateTranscript = asyncHandler(async (req, res) => {
  const transcript = await Transcript.findById(user.params.id);
  const name = req.body.name;
  const data = req.body.data;

  if (!transcript) {
    res.status(401).json("Transcript not Found");
  }

  try {
    if (name) {
      transcript.name = name;
    }
    if (data) {
      transcript.data = data;
    }
  } catch (error) {
    res.status(400).json("Invalid Input Fields");
  }
});
