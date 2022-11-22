import FlowDAO from "../DAO/flow_dao.js";
import parse from "../utils/parse.js";

//Interactor calling the Flow DAO functions after properly checking the inputs
export default class FlowInteractor {
  //Empty constructor
  constructor(props) {
    super(props);
  }

  //Gets the flow by ID
  getFlow(req, res) {
    FlowDAO.getFlowByID(req, res);
  }

  //If no flow name exists creates a new flow
  createFlow(req, res) {
    if (!FlowDAO.flowNameExists(req, res)) {
      const transcript = req.body.transcript;

      const name = req.body.name;
      const questions = parse(transcript);

      const request = { name: name, questions: questions };
      FlowDAO.createFlow(request, res);
    }
  }

  //If the flow exists already, then it is updated
  updateFlow(req, res) {
    if (FlowDAO.flowIDExists(req, res)) {
      FlowDAO.updateFlow(req, res);
    }
  }

  //Deletes flow
  deleteFlow(req, res) {
    FlowDAO.deleteTranscriptByID(req, res);
  }
}
