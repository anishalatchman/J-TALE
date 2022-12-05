import server from "./httpSource";

export default class uploadFileDAO {
  async uploadFile(transcript) {
    try {
      const res = await server.post("/transcript/add", transcript);
      console.log("Transcript Uploaded!");
      return res.data.id;
    } catch (e) {
      return false;
    }
  }

  async deleteFile(id) {
    try {
      await server.delete("/transcript/delete/" + id);
      console.log("Transcript Deleted!");
      return true;
    } catch (e) {
      return false;
    }
  }

  //Makes QA object in database
  async createQA(question) {
    try {
      await server.post("/qa/add", question);
    } catch (e) {
      console.log(e.response.data);
    }
  }

  //Gets the QA from the backend by ID
  async getQAByID(id) {
    try {
      const res = await server.get("/qa/", {
        params: { id: id },
      });
      return res;
    } catch (e) {
      console.log(e.response.data);
    }
  }

  // Axios call to delete a single QA object
  async deleteqa(qa) {
    await server.delete("/qa/delete", {
      data: { id: qa },
    });
  }
}
