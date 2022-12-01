import axios from "axios";

export default class getFlowData {
  async getFlowData(questionsList) {
    // This iterates through all of the questions in the DB and checks with ones are included
    try {
      const questionsTrue = questionsList.map((question) => {
        this.getQAByID(question).then((response) => {
          //If response is successful, change to next page and show the additional navbar info
          if (response.status === 200) {
            if (response.data.question_included) {
              return this.sortQA(response.data);
            }
          } else {
            return null;
          }
        });
      });
      const lst = await Promise.all(questionsTrue);
      return lst;
    } catch (e) {}
    //   ;
    // } catch (e) {
    //   console.log("Error Getting QA Object");
    // }

    // for (var i = 0; i < questionsList.length; i++) {
    //   this.getQAByID(questionsList[i]).then((response) => {
    //     //If response is successful, change to next page and show the additional navbar info
    //     if (response.status === 200) {
    //       if (response.data.question_included) {
    //         lst.push(this.sortQA(response.data));
    //       }
    //     } else {
    //       console.log("Error Getting QA Object");
    //     }
    //   });
    // }

    // return lst;
  }

  async getQAByID(id) {
    try {
      const res = await axios.get("http://localhost:5000/qa/", {
        params: { id: id },
      });
      return res;
    } catch (e) {
      console.log(e.response.data);
    }
  }

  sortQA(qa) {
    const intents = [];
    for (var i = 0; i < qa.intents.length; i++) {
      if (qa.intents[i].included) {
        intents.push(qa.intents[i]);
      }
    }
    qa.intents = intents;
    return qa;
  }
}
