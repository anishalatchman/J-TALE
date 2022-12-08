import recoverSessionDAO from "../DAO/recoverSessionDAO";

export default class recoverSessionInteractor {
  constructor() {
    this.recoverDAO = new recoverSessionDAO();
  }

  async getQA(flow) {
    // Retrieves current QA ID from flow object
    const qaID = this.getQAIDFromFlow(flow);
    if (!qaID) {
      return false;
    }
    // returns a QA object
    var returnVal = false;
    await this.recoverDAO.getQAFromID(qaID).then((res) => {
      if (res.status === 200 && res.data) {
        returnVal = res.data;
      }
    });
    return returnVal;
  }

  async getFlow(sessionID) {
    var returnVal = false;
    // returns a flow object
    await this.recoverDAO.getFlowBySessionID(sessionID).then((res) => {
      if (res.status === 200 && res.data) {
        returnVal = res.data;
      }
    });
    return returnVal;
  }

  // returns first QA pair from given flow json object
  getQAIDFromFlow(flow) {
    return flow.current_question;
  }
}
