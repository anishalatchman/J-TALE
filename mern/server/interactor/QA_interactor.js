import QA_DAO from "../DAO/QA_dao.js";
//Interactor calling the QA DAO functions after properly checking the inputs
export default class QA_Interactor {
  //Empty constructor
  constructor(props) {
    super(props);
  }

  //Gets the QA by ID
  getQA(req, res) {
    QA_DAO.getQAByID(req, res);
  }

  //Creates a new QA
  createQA(req, res) {
    QA_DAO.createQA(req, res);
  }

  //Updates QA if new QA object is valid and QA exists in collection
  updateQA(req, res) {
    const qa = QA_DAO.QAExists(req, res);
    if (!qa) {
      res.status(400, "QA not Found");
    }
    if (req.body.question && req.body.intents && req.body.question_included) {
      qa.question = question;
      qa.intents = intents;
      qa.question_included = question_included;
      QA_DAO.updateQA(qa, res);
    }
  }

  //Deletes QA by ID
  deleteQA(req, res) {
    QA_DAO.deleteQAByID(req, res);
  }
}
