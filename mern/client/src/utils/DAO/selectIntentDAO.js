import server from "./httpSource";

export default class selectIntentDAO {
  // This function updates the QA object in the DB
  async updateQA(qa) {
    try {
      const res = await server.put("/qa/update", qa);
      return res;
    } catch (e) {
      console.log(e.response.data);
    }
  }
}
