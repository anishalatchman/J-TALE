import axios from "axios";

export default class selectIntentDAO {
  // This function updates the QA object in the DB
  async updateQA(qa) {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/qa/update`,
        qa
      );
      console.log(res);
      return res;
    } catch (e) {
      console.log(e.response.data);
    }
  }
}
