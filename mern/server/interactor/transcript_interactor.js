import transcriptDAO from "../DAO/transcript_dao.js";
//Interactor calling the Transcript DAO functions after properly checking the inputs

let TranscriptDAO = new transcriptDAO();

export default class transcriptInteractor {
  //Empty constructor
  constructor() {}

  //Gets transcript by ID
  getTranscript(req, res) {
    TranscriptDAO.getTranscriptByID(req, res);
  }

  //Creates transcript and checks success of creation
  createTranscript(req, res) {
    if (this.checkProperty(req, res)) {
      return;
    }
    if (this.validProperty(req, res)) {
      return;
    }

    TranscriptDAO.transcriptExists(req).then((response) => {
      if (!response) {
        TranscriptDAO.createTranscript(req, res);
      } else {
        res.status(400).json("Transcript Exists");
      }
    });
  }

  //Checks if ID exists and updates transcript by ID
  updateTranscript(req, res) {
    if (this.checkProperty(req, res)) {
      return;
    }
    if (this.validProperty(req, res)) {
      return;
    }

    TranscriptDAO.transcriptExistsID(req).then((transcript) => {
      if (!transcript) {
        return;
      }
      transcript.name = req.body.name;
      transcript.data = req.body.data;
      TranscriptDAO.updateTranscript(transcript, res);
    });
  }

  deleteTranscript(req, res) {
    TranscriptDAO.deleteTranscript(req, res);
  }

  checkProperty(req, res) {
    if (!req.body.name || !req.body.data) {
      res.status(400).json("Missing transcript data");
      return true;
    }
  }

  validProperty(req, res) {
    if (typeof req.body.name !== "string") {
      res.status(400).json("Invalid Input Field");
      return true;
    }
  }
}
