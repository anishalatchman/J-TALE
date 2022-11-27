import Transcript from "../models/transcript.model.js";

//Class of DAO functions related to the Transcript entity
export default class transcriptDAO {
  //Empty constructor
  constructor() {}

  //Gets transcript by ID and returns the object
  async getTranscriptByID(req, res) {
    try {
      const transcript = await Transcript.findById(req.params.id);
      res.status(200).json(transcript);
    } catch (e) {
      res.status(400).json("Transcript Not Found");
      return false;
    }
  }

  //Creates new transcript
  async createTranscript(req, res) {
    try {
      const transcript = await Transcript.create({
        name: req.body.name,
        data: req.body.data,
      });
      res.status(200).json({
        id: transcript.id,
        name: transcript.name,
      });
    } catch (e) {
      res.status(400).json("Invalid transcript Data");
      return false;
    }
  }

  //Updates an existing transcript at a specific ID
  async updateTranscript(transcript, res) {
    try {
      transcript.save();
      res.status(200).json(transcript.id);
    } catch (error) {
      res.status(400).json("Invalid Input Fields");
    }
  }

  //Deletes an existing transcript
  async deleteTranscript(req, res) {
    try {
      res.status(200).json(await Transcript.findByIdAndDelete(req.params.id));
    } catch (error) {
      res.status(400).json("Unable to Delete Transcript");
    }
  }

  // Checks to see if Transcript Exists by Name
  async transcriptExists(req) {
    const transcript = Transcript.findOne({ name: req.body.name });
    return transcript;
  }

  // Checks to see if Transcript Exists by ID
  async transcriptExistsID(req) {
    const transcript = Transcript.findById(req.params.id);
    return transcript;
  }
}
