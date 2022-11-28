import qa_DAO from "../DAO/QA_dao.js";
//Interactor calling the QA DAO functions after properly checking the inputs

let QA_DAO = new qa_DAO();

export default class qa_Interactor {
  //Empty constructor
  constructor() {}

  //Gets the QA by ID
  getQA(req, res) {
    QA_DAO.getQAByID(req, res);
  }

  //Creates a new QA
  createQA(req, res) {
    if (
      !req.body.hasOwnProperty("id") ||
      !req.body.hasOwnProperty("question") ||
      !req.body.hasOwnProperty("question_included")
    ) {
      res.status(400).json("Missing Input Field");
      return;
    }

    QA_DAO.QAExists(req).then((qa) => {
      if (!qa) {
        QA_DAO.createQA(req, res);
      } else {
        res.status(400).json("QA Exists");
      }
    });
  }

  //Updates QA if new QA object is valid and QA exists in collection
  updateQA(req, res) {
    if (
      !req.body.hasOwnProperty("id") ||
      !req.body.hasOwnProperty("question") ||
      !req.body.hasOwnProperty("question_included")
    ) {
      res.status(400).json("Missing Input Field");
      return;
    }

    QA_DAO.QAExists(req).then((qa) => {
      if (!qa) {
        res.status(400).json("QA not Found");
        return;
      }

      qa.id - req.body.id;
      qa.question = req.body.question;
      qa.intents = req.body.intents;
      qa.question_included = req.body.question_included;
      QA_DAO.updateQA(qa, res);
    });
  }

  //Deletes QA by ID
  deleteQA(req, res) {
    QA_DAO.deleteQAByID(req, res);
  }
}
