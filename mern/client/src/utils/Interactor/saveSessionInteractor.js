import saveSessionDAO from "../DAO/saveSessionDAO";

const saveDAO = new saveSessionDAO();

export default class saveSessionInteractor {
  // Takes in the flow object, session id to update the flow in DB, returning success
  async saveFlow(flow, sessionID) {
    var saved = false;
    await saveDAO.saveFlow(flow, sessionID).then((res) => {
      if (res.status === 200) {
        saved = true;
      }
    });

    return saved;
  }

  //updates the flow parameter with the current question
  updateCurrQuestion(flow, qa) {
    flow.current_question = qa.id;
  }
}
