import saveSessionDAO from "../DAO/saveSessionDAO";

export default class saveSessionInteractor {
  constructor() {
    this.saveDAO = new saveSessionDAO();
  }
  // Takes in the flow object, session id to update the flow in DB, returning success
  async saveFlow(flow, sessionID) {
    var saved = false;
    await this.saveDAO.saveFlow(flow, sessionID).then((res) => {
      if (res.status === 200) {
        saved = true;
      }
    });

    return saved;
  }

  //updates the flow parameter with the current question
  updateCurrQuestion(flow, qa) {
    flow.current_question = qa.id;
    return flow;
  }
}
