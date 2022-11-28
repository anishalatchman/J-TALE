import asyncHandler from "express-async-handler";
import transcriptInteractor from "../interactor/transcript_interactor.js";
//Controller for Transcript entity

let TranscriptInteractor = new transcriptInteractor();

//Gets transcript
export const getTranscript = asyncHandler(async (req, res) => {
  TranscriptInteractor.getTranscript(req, res);
});

//Creates transcript
export const createTranscript = asyncHandler(async (req, res) => {
  TranscriptInteractor.createTranscript(req, res);
});

//Updates transcript
export const updateTranscript = asyncHandler(async (req, res) => {
  TranscriptInteractor.updateTranscript(req, res);
});

//Deletes transcript
export const deleteTranscript = asyncHandler(async (req, res) => {
  TranscriptInteractor.deleteTranscript(req, res);
});
