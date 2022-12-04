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

  // Checks if transcript file is a string and calls Upload Transcript
  async transcriptJSONConverter(fileName, body) {
    if (typeof fileName === "string") {
      // Defines new obj transcript in form required by mongoose schemas
      const transcript = { name: fileName, data: body };
      const res = await this.uploadFile(transcript);
      return res;
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
}
