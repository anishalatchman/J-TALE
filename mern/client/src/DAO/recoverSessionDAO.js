import axios from 'axios';
// axios call in here
// DAO is the inner most layer because DB stores our entities (flow, QA, transcript)

// Returns flow json object with matching sessionID
export async function getFlowBySessionID(sessionID) {
    try {
      const response = await axios.get(`http://localhost:5000/flow/${sessionID}`, sessionID);
      const { data } = response;
      // return the flow object
      return data;

    } catch (e) {
      return false;
    }
}
