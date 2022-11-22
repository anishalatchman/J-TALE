import TranscriptDAO from "../DAO/transcript_dao.js";
//Interactor calling the Transcript DAO functions after properly checking the inputs

export default class TranscriptInteractor {
  //Empty constructor
  constructor(props) {
    super(props);
  }

  //Gets transcript by ID
  getTranscript(req, res) {
    TranscriptDAO.getTranscriptByID(req, res);
  }

  //Creates transcript and checks success of creation
  createTranscript(req, res) {
    const transcript = TranscriptDAO.createTranscript(req, res);
    if (transcript) {
      res.status(200, {
        id: transcript.id,
        name: transcript.name,
      });
    } else {
      res.status(400, "Transcript not created");
    }
  }

  //Checks if ID exists and updates transcript by ID
  updateTranscript(req, res) {
    const transcript = TranscriptDAO.getTranscriptByID(req, res);
    if (transcript) {
      if (req.body.name && req.body.data) {
        transcript.name = req.body.name;
        transcript.data = req.body.data;
      }
      TranscriptDAO.updateTranscript(transcript, res);
    } else {
      res.status(400, "No Transcript at this ID");
    }
  }

  deleteTranscript(req, res) {
    TranscriptDAO.deleteTranscript(req, res);
  }
}
