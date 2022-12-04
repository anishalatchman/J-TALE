import server from "./httpSource";

export default class saveSessionDAO {
  // Takes in the flow object, current question and session id to update the flow parameter with
  // the current question
  async saveFlow(flow, sessionID) {
    await server.put(`/flow/update/${sessionID}`, flow).then((res) => {
      if (res.status === 200) {
        return true;
      }
      return false;
    });
  }
}
