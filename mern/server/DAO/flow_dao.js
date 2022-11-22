import Flow from "../models/flow.model.js";

//Class of DAO functions related to the Flow entities
export default class FlowDAO {
  //Empty constructor
  constructor(props) {
    super(props);
  }

  // Gets the flow by ID
  async getFlowByID(req, res) {
    try {
      const flow = await Flow.findById(req.params.id);
      res.status(200, { flow });
    } catch (error) {
      res.status(400, "No Flow Exist");
    }
  }

  //Returns whether flow name already exists to prevent duplicate flow
  async flowNameExists(req, res) {
    if (await Flow.findOne({ name: req.body.name })) {
      res.status(200, "Flow already exists");
      return true;
    }
    return false;
  }

  //Creates new flow with a parsed transcript
  async createFlow(req, res) {
    try {
      const flow = await Flow.create({
        name: req.name,
        questions: req.questions,
      });
      res.status(200, { id: flow.id, name: flow.name });
    } catch (e) {
      res.status(400, "Invalid Flow Data");
    }
  }

  //Checks whether flow ID exists
  async flowIDExists(req, res) {
    if (await Flow.findById(req.params.id)) {
      return true;
    }
    res.status(200, "No Flow Exists with Given ID");
    return false;
  }

  //Updates the existing flow
  async updateFlow(req, res) {
    try {
      const flow = await Flow.create({
        name: req.body.name,
        questions: req.body.questions,
      });
      res.status(200, { id: flow.id });
    } catch (e) {
      res.status(400, "Invalid Input Fields");
    }
  }

  //Deletes the flow by ID
  async deleteTranscriptByID(req, res) {
    try {
      const flow = await Flow.findByIdAndDelete(req.params.id);
      res.status(200, { flow });
    } catch (e) {
      res.status(400, "Unable to Delete Flow");
    }
  }
}
