import Flow from "../models/flow.model.js";

export default class FlowDAO {

  constructor(props){
    super(props)
  }

  getFlow(req) {
    try {
      const flow = await Flow.findById(req.params.id);
      return 200, { flow };
    } catch (error) {
      return 400, "No Flow Exist";
    }
  }
  
  createTranscript(req) {
    const name = req.name;
    const questions = req.questions;
  
    let flowExists = await Flow.findOne({ name });
  
    if (flowExists) {
      return "Session already exists";
    }
  
    const flow = await Flow.create({
      name,
      questions,
    });
    if (flow) {
      return (
        200,
        {
          id: transcript.id,
          name: transcript.name,
        }
      );
    } else {
      return 400, "Invalid transcript Data";
    }
  }
  
  updateTranscript(req) {
    const flow = await Flow.findById(req.params.id);
  
    if (!flow) {
      return 200, "No Flow Exists with Given ID";
    }
  
    const name = req.body.name;
    const questions = req.body.questions;
  
    // Move the ifs to interactor
    try {
      if (name) {
        flow.name = name;
      }
      if (questions) {
        flow.questions = questions;
      }
      flow.save();
      return 200, { id: flow.id };
    } catch (error) {
      return 400, "Invalid Input Fields";
    }
  }
  
  deleteTranscript(req) {
    try {
      const flow = Flow.findByIdAndDelete(req.params.id);
      return 200, { flow };
    } catch {
      return 400, "Unable to Delete Flow";
    }
  }
}

