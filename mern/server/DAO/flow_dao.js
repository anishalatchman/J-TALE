import Flow from "../models/flow.model.js";

//Class of DAO functions related to the Flow entities
export default class flowDAO {
  //Empty constructor
  constructor() {}

  // Gets the flow by ID
  async getFlowByID(req, res) {
    try {
      const flow = await Flow.findById(req.params.id);
      res.status(200).json(flow);
    } catch (error) {
      res.status(400).json("No Flow Exists");
    }
  }

  //Returns whether flow name already exists to prevent duplicate flow
  async flowNameExists(req) {
    const flow = await Flow.findOne({ name: req.body.name });
    return flow;
  }

  //Creates new flow with a parsed transcript
  async createFlow(req, res) {
    try {
      const flow = await Flow.create({
        name: req.body.name,
        questions: req.body.questions,
        allQuestions: req.body.allQuestions,
        current_question: "",
        transcriptID: req.body.transcriptID,
        speechList: [],
      });
      res.status(200).json(flow);
    } catch (e) {
      res.status(400).json("Invalid Flow Data");
    }
  }

  async flowExists(req) {
    const qa = await Flow.findById(req.params.id);
    return qa;
  }

  //Updates the existing flow
  async updateFlow(flow, res) {
    try {
      flow.save();
      res.status(200).json({ id: flow.id, name: flow.name });
    } catch (e) {
      res.status(400).json("Invalid Input Fields");
    }
  }

  //Deletes the flow by ID
  async deleteFlowByID(req, res) {
    try {
      const flow = await Flow.findByIdAndDelete(req.params.id);
      res.status(200).json(flow);
    } catch (e) {
      res.status(400).json("Unable to Delete Flow");
    }
  }
}
