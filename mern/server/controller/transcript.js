import TranscriptInteractor from "../interactor/transcript_interactor";
import asyncHandler from "express-async-handler";
//Controller for Transcript entity

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
