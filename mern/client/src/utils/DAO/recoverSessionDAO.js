import axios from "axios";

export default class recoverSessionDAO {
  // Returns flow json object with matching sessionID
  async getFlowBySessionID(sessionID) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/flow/${sessionID}`
      );
      return response;
    } catch (e) {
      return false;
    }
  }

  // Returns QA json object with matching ID
  async getQAFromID(qaID) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/qa/`,
        {
          params: { id: qaID },
        }
      );
      return response;
    } catch (e) {
      console.log(e.response);
      return false;
    }
  }
}
