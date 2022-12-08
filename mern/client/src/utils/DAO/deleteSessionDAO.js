import axios from "axios";

export default class deleteSessionDAO {
  // Axios Call to delete flow
  async removeFlow(sessionID) {
    const res = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/flow/delete/${sessionID}`
    );
    return res;
  }

  // Axios Call to Delete transcript
  async removeTranscript(transcriptID) {
    const res = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/transcript/delete/${transcriptID}`
    );
    return res;
  }

  // Axios call to delete a single QA object
  async deleteqa(qa) {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/qa/delete`, {
        data: { id: qa },
      });
      return qa;
    } catch (e) {
      return e.response.data;
    }
  }
}
