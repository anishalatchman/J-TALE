import axios from "axios";

export default class saveSessionDAO {
  // Takes in the flow object, current question and session id to update the flow parameter with
  // the current question
  async saveFlow(flow, sessionID) {
    return await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/flow/update/${sessionID}`,
      flow
    );
  }
}
