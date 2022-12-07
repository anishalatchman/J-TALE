import axios from "axios";

export default class uploadFileDAO {
  constructor() {}

  async uploadFile(transcript) {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/transcript/add`,
        transcript
      );
      console.log("Transcript Uploaded!");
      return res.data.id;
    } catch (e) {
      return false;
    }
  }

  async deleteFile(id) {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/transcript/delete/` + id
      );
      console.log("Transcript Deleted!");
      return true;
    } catch (e) {
      return false;
    }
  }

  //Makes QA object in database
  async createQA(question) {
    try {
      return await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/qa/add`,
        question
      );
    } catch (e) {
      console.log(e.response.data);
    }
  }

  //Gets the QA from the backend by ID
  async getQAByID(id) {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/qa/`, {
        params: { id: id },
      });
      return res;
    } catch (e) {
      console.log(e.response.data);
    }
  }

  // Axios call to delete a single QA object
  async deleteqa(qa) {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/qa/delete`, {
        data: { id: qa },
      });
      return qa;
    } catch (e) {
      return false;
    }
  }
}
