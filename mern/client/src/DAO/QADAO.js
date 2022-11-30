import axios from 'axios';
// DAO is the inner most layer because DB stores our entities (flow, QA, transcript)

// Returns QA json object with matching ID
export async function getQAFromID(qaID) {
    try {
      const response = await axios.get(`http://localhost:5000/qa/`, { params: { id: qaID }, });
      const { data } = response;
      // return the QA object
      return data;

    } catch (e) {
      console.log(e.response)
      return false;
    }
}
