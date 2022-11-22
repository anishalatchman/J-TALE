import Transcript from "../models/transcript.model.js";

//Class of DAO functions related to the Transcript entity
export default class TranscriptDAO {
  //Empty constructor
  constructor(props) {
    super(props);
  }

  //Gets transcript by ID and returns the object
  async getTranscriptByID(req, res) {
    try {
      const transcript = await Transcript.findById(req.body.id);
      res.status(200, { transcript });
      return transcript;
    } catch (e) {
      res.status(400, "Transcript Not Found");
      return false;
    }
  }

  //Creates new transcript
  async createTranscript(req, res) {
    try {
      return await Transcript.create({
        name: req.body.name,
        data: req.body.data,
      });
    } catch (e) {
      res.status(400, "Invalid transcript Data");
    }
  }

  //Updates an existing transcript at a specific ID
  async updateTranscript(transcript, res) {
    try {
      transcript.save();
      res.status(200, transcript.id);
    } catch (error) {
      res.status(400, "Invalid Input Fields");
    }
  }

  //Deletes an existing transcript
  async deleteTranscript(req, res) {
    try {
      res.status(200, await Transcript.findByIdAndDelete(req.params.id));
    } catch (error) {
      res.status(400, "Unable to Delete Transcript");
    }
  }
}
