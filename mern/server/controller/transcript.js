import Transcript from "../models/transcript.model.js";
import asyncHandler from "express-async-handler";

export const getTranscript = asyncHandler(async (req, res) => {
  val = Transcript.getTranscript(req);
  res.status(val[0]).json(val[1]);
});

export const createTranscript = asyncHandler(async (req, res) => {
  val = Transcript.createTranscript(req);
  res.status(val[0]).json(val[1]);
});

export const createTranscriptAPI = asyncHandler(async (req, res) => {
  val = Transcript.createTranscripAPIt(req);
  res.status(val[0]).json(val[1]);
});

export const updateTranscript = asyncHandler(async (req, res) => {
  val = Transcript.updateTranscriptAPI(req);
  res.status(val[0]).json(val[1]);
});

export const deleteTranscript = asyncHandler(async (req, res) => {
  val = Transcript.deleteTranscript(req);
  res.status(val[0]).json(val[1]);
});
