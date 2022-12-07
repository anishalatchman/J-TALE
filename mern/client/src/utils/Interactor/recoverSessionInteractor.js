import recoverSessionDAO from "../DAO/recoverSessionDAO";

export default class recoverSessionInteractor {
  constructor() {
    this.recoverDAO = new recoverSessionDAO();
  }

  async getQA(flow) {
    // Retrieves current QA ID from flow object
    const qaID = this.getQAIDFromFlow(flow);
    // returns a QA object
    const qaObject = await this.recoverDAO.getQAFromID(qaID);
    return qaObject;
  }

  async getFlow(sessionID) {
    // returns a flow object
    const res = await this.recoverDAO.getFlowBySessionID(sessionID);
    return res;
  }

  // returns first QA pair from given flow json object
  getQAIDFromFlow(flow) {
    return flow.current_question;
  }
}
