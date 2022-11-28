import flowDAO from "../DAO/flow_dao.js";
let FlowDAO = new flowDAO();

//Interactor calling the Flow DAO functions after properly checking the inputs
export default class flowInteractor {
  //Empty constructor
  constructor() {}

  //Gets the flow by ID
  getFlow(req, res) {
    FlowDAO.getFlowByID(req, res);
  }

  //If no flow name exists creates a new flow
  createFlow(req, res) {
    if (
      !req.body.hasOwnProperty("name") ||
      !req.body.hasOwnProperty("questions")
    ) {
      res.status(400).json("Missing Input Field");
      return;
    }

    if (typeof req.body.name !== "string") {
      res.status(400).json("Invalid Input Field");
      return;
    }
    if (
      req.body.questions &&
      req.body.questions !== [] &&
      typeof req.body.questions[0] !== "string"
    ) {
      res.status(400).json("Invalid Input Field");
      return;
    }

    FlowDAO.flowNameExists(req, res).then((response) => {
      if (!response) {
        FlowDAO.createFlow(req, res);
      } else {
        res.status(400).json("Flow Exists");
      }
    });
  }

  //If the flow exists already, then it is updated
  updateFlow(req, res) {
    if (
      !req.body.hasOwnProperty("name") ||
      !req.body.hasOwnProperty("questions")
    ) {
      res.status(400).json("Missing Input Field");
      return;
    }
    FlowDAO.flowExists(req, res).then((flow) => {
      if (!flow) {
        res.status(400).json("No Flow Exists");
      }

      flow.name = req.body.name;
      flow.questions = req.body.questions;
      flow.current_question = req.body.current_question;
      FlowDAO.updateFlow(flow, res);
    });
  }

  //Deletes flow
  deleteFlow(req, res) {
    FlowDAO.deleteFlowByID(req, res);
  }
}
