import transcript from "../DAO/transcript_dao.js";

export function getTranscript(req) {
  return transcript.getTranscript(req);
}

export function createTranscript(req) {
  return transcript.createTranscript(req);
}

export function createTranscript(req) {
  return transcript.createTranscriptAPI(req);
}

export function updateTranscript(req) {
  return transcript.updateTranscript(req);
}

export function deleteTranscript(req) {
  return transcript.deleteTranscript(req);
}
