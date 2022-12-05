import uploadFileDAO from "../DAO/uploadFileDAO";

const uploadDAO = new uploadFileDAO();
export default class uploadFileInteractor {
  constructor() {
    this.allQuestionList = [];
  }
  // Checks if transcript file is a string and calls Upload Transcript
  async uploadFile(transcript) {
    if (typeof transcript.fileName === "string") {
      const res = await uploadDAO.uploadFile(transcript);
      return res;
    }
  }

  deleteFile(id) {
    return uploadDAO.deleteFile(id);
  }

  // Returns a list of the initial QA ids
  initialQAID(qlist) {
    if (qlist.length === 0) {
      return null;
    }
    return qlist[0].id; // Return the first item in the list which should be the top level question
  }

  //If all questions isn't empty, reset it to empty
  resetAllQuestions() {
    if (this.allQuestionList !== []) {
      this.allQuestionList = [];
    }
  }

  //Parses the given transcript and returns the list of starting IDs and the list of all question objects
  parse(transcript) {
    const startingList = [];
    this.resetAllQuestions();

    for (var i = 0; i < transcript.length; i++) {
      this.questionLoop(transcript[i]);
      startingList.push(this.initialQAID(transcript[i])); //Finds the ids of the starting question and pushes it to the list
    }

    return {
      startingList: startingList,
      allQuestionList: this.allQuestionList,
    };
  }

  //Loops through all questions in the JSON object qlist, sending to DB and ids to allQuestionList
  questionLoop(qlist) {
    //qlist is a list of JSON objects that exists as questions/answer pairs
    for (var i = 0; i < qlist.length; i++) {
      uploadDAO.createQAs(qlist[i]);
      this.allQuestionList.push(qlist[i].id);
    }
  }

  getQAList(idList) {
    const lst = [];
    for (var i = 0; i < idList.length; i++) {
      uploadDAO.getQAByID(idList[i]).then((response) => {
        //If response is successful, change to next page and show the additional navbar info
        if (response.status) {
          lst.push(response.data);
        } else {
          console.log("ERROR GETTING QA OBJECT");
        }
      });
    }
    return lst;
  }

  // Loops through the questions list in flow and deletes each item (helper to qaDeleted)
  async removeQAs(flow) {
    for (var i = 0; i < flow.allQuestions.length; i++) {
      try {
        await uploadDAO.deleteqa(flow.allQuestions[i]);
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
}
