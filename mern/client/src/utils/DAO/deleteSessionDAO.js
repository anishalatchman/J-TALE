import server from "./httpSource";

export default class deleteSessionDAO {
  // Axios Call to delete flow
  async removeFlow(sessionID) {
    const res = await server.delete(`/flow/delete/${sessionID}`);
    return res;
  }

  // Axios Call to Delete transcript
  async removeTranscript(transcriptID) {
    const res = await server.delete(`/transcript/delete/${transcriptID}`);
    return res;
  }

  // Axios call to delete a single QA object
  async deleteqa(qa) {
    await server.delete("/qa/delete", {
      data: { id: qa },
    });
  }
}
