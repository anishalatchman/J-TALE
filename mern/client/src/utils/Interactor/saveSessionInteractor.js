import saveSessionDAO from "../DAO/saveSessionDAO";

const saveDAO = new saveSessionDAO();

export default class saveSessionInteractor {
  // Takes in the flow object, session id to update the flow in DB, returning success
  saveFlow(flow, sessionID) {
    return saveDAO.saveFlow(flow, sessionID);
  }

  //updates the flow parameter with the current question
  updateCurrQuestion(flow, qa) {
    flow.current_question = qa.id;
  }
}
