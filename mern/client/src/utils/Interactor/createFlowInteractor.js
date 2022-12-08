import createFlowDAO from "../DAO/createFlowDAO";

export default class createFlowInteractor {
  constructor() {
    this.flowDAO = new createFlowDAO();
  }
  // Checks if flowName exists and is a string and uploads flow
  async flowUploader(flow) {
    if (typeof flow.name === "string" && flow.name !== "") {
      const res = await this.flowDAO.uploadFlow(flow);
      return res;
    }
  }
}
