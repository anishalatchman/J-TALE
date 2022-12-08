import axios from "axios";

export default class createFlowDAO {
  //Uploads flow to DB, returning the created flow's information and status
  async uploadFlow(flow) {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/flow/add`,
        flow
      );
      console.log("Flow Uploaded!");
      return { status: true, res: res };
    } catch (e) {
      return { status: false };
    }
  }
}
