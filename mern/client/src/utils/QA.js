import axios from "axios";

export default class QA {
  getQAList(idList) {
    const lst = [];
    for (var i = 0; i < idList.length; i++) {
      this.getQAByID(idList[i]).then((response) => {
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

  // This function updates the QA object in the DB
  async updateQA(qa) {
    try {
      const res = await axios.put("http://localhost:5000/qa/update", qa);
      return res;
    } catch (e) {
      console.log(e.response.data);
    }
  }
}
