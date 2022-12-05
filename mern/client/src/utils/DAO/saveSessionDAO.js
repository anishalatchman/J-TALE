import server from "./httpSource";

export default class saveSessionDAO {
  // Takes in the flow object, current question and session id to update the flow parameter with
  // the current question
  async saveFlow(flow, sessionID) {
    return await server.put(`/flow/update/${sessionID}`, flow);
  }
}
