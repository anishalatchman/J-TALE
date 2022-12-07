import QA from "../models/question_answer.js";

//Class of DAO functions related to the QA entities
export default class qa_DAO {
  //Empty constructor
  constructor() {}

  //Gets the QA by ID
  async getQAByID(req, res) {
    const qa = await QA.findOne({ id: req.query.id });
    if (qa) {
      res.status(200).json(qa);
    } else {
      res.status(400).json("No Qa Exists");
    }
  }

  //Creates a new QA
  async createQA(req, res) {
    try {
      const qa = await QA.create({
        id: req.body.id,
        question: req.body.question,
        intents: req.body.intents,
        question_included: req.body.question_included,
      });
      res.status(200).json(qa.id);
    } catch (e) {
      res.status(400).json("Invalid QA Data");
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
      res.status(200).json(qa.id);
    } catch (e) {
      res.status(400).json("Invalid Input Fields");
    }
  }

  //Deletes QA by id
  async deleteQAByID(req, res) {
    try {
      const qa = await QA.findOneAndDelete({ id: req.body.id });
      res.status(200).json(qa);
    } catch (error) {
      res.status(400).json("Unable to Delete QA");
    }
  }
}
