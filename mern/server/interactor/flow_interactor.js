import flowDAO from "../DAO/flow_dao.js";
import mongoose from "mongoose";

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
    if (this.checkProperty(req, res)) {
      return;
    }

    if (this.invalidProperty(req, res)) {
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
    if (this.checkProperty(req, res)) {
      return;
    }

    if (this.invalidProperty(req, res)) {
      return;
    }

    FlowDAO.flowExists(req, res).then((flow) => {
      if (!flow) {
        res.status(400).json("No Flow Exists");
      }

      flow.name = req.body.name;
      flow.questions = req.body.questions;
      flow.allQuestions = req.body.allQuestions;
      flow.current_question = req.body.current_question;
      flow.transcriptID = req.body.transcriptID;
      flow.speechList = req.body.speechList;
      FlowDAO.updateFlow(flow, res);
    });
  }

  //Deletes flow
  deleteFlow(req, res) {
    FlowDAO.deleteFlowByID(req, res);
  }

  // Checks if all required inputs exist
  checkProperty(req, res) {
    if (
      !req.body.hasOwnProperty("name") ||
      !req.body.hasOwnProperty("questions") ||
      !req.body.hasOwnProperty("allQuestions") ||
      !req.body.hasOwnProperty("transcriptID")
    ) {
      res.status(400).json("Missing Input Field");
      return true;
    }

    return false;
  }

  // Checks if the input parameters are valid
  invalidProperty(req, res) {
    if (typeof req.body.name !== "string") {
      res.status(400).json("Invalid Input Field");
      return true;
    }
    if (!this.isValidObjectId(req.body.transcriptID)) {
      res.status(400).json("Invalid Input Field");
      return true;
    }
    if (
      req.body.questions &&
      req.body.questions !== [] &&
      typeof req.body.questions[0] !== "string"
    ) {
      res.status(400).json("Invalid Input Field");
      return true;
    }

    if (
      req.body.allQuestions &&
      req.body.allQuestions !== [] &&
      typeof req.body.allQuestions[0] !== "string"
    ) {
      res.status(400).json("Invalid Input Field");
      return true;
    }
  }

  isValidObjectId(id) {
    if (mongoose.isValidObjectId(id)) {
      if (String(new mongoose.Types.ObjectId(id)) === id) return true;
      return false;
    }
    return false;
  }
}
