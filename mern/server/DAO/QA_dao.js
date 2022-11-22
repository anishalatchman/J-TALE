import QA from "../models/question_answer.js";

//Class of DAO functions related to the QA entities
export default class QA_DAO {
  //Empty constructor
  constructor(props) {
    super(props);
  }

  //Gets the QA by ID
  async getQAByID(req, res) {
    try {
      const qa = await QA.findOne({ id: req.body.id });
      res.status(200, { qa });
    } catch (e) {
      res.status(400, "No Qa Exists with Given Session ID");
    }
  }

  //Creates a new QA
  async createQA(req, res) {
    try {
      const qa = await QA.create({
        id: req.body.id,
        question: req.body.question,
        intent: req.body.intent,
        question_included: req.body.question_included,
      });
      res.status(200, { id: qa.id });
    } catch (e) {
      res.status(400, "Invalid QA Data");
    }
  }

  //Finds QA by ID and returns the object's representation in the collection
  async QAExists(req) {
    const qa = await QA.findOne({ id: req.body.id });
    return qa;
  }

  //Updates QA with the qa object passed in
  async updateQA(qa, res) {
    try {
      qa.save();
      res.status(200, { id: qa.id });
    } catch (e) {
      res.status(400, "Invalid Input Fields");
    }
  }

  //Deletes QA by id
  async deleteQAByID(req, res) {
    try {
      const qa = await QA.findOneAndDelete({ id: req.body.id });
      res.status(200, { qa });
    } catch (error) {
      res.status(400, "Unable to Delete QA");
    }
  }
}
