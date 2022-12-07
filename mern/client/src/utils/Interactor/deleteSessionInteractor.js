import deleteSessionDAO from "../DAO/deleteSessionDAO";

export default class deleteSessionInteractor {
  constructor() {
    this.deleteDAO = new deleteSessionDAO();
  }
  // Loops through the questions list in flow and deletes each item (helper to qaDeleted)
  async removeQAs(flow) {
    for (var i = 0; i < flow.allQuestions.length; i++) {
      try {
        await this.deleteDAO.deleteqa(flow.allQuestions[i]);
      } catch {
        return false;
      }
    }
    return true;
  }

  //Deletes QAs and returns status of success
  async qaDeleted(flow) {
    // Delete QAs associated with flow
    var qaDeleted = false;
    await this.removeQAs(flow).then((res) => {
      qaDeleted = res;
    });
    return qaDeleted;
  }

  //Deletes flow and returns status of success
  async flowDeleted(sessionID) {
    // Delete the flow itself
    var flowDeleted = false;
    await this.deleteDAO.removeFlow(sessionID).then((response) => {
      if (response.status === 200) {
        flowDeleted = true;
      }
    });
    return flowDeleted;
  }

  //Deletes transcript and returns status of success
  async transcriptDeleted(transcriptID) {
    var transcriptDeleted = false;
    await this.deleteDAO.removeTranscript(transcriptID).then((response) => {
      if (response.status === 200) {
        transcriptDeleted = true;
      }
    });
    return transcriptDeleted;
  }
}
