import createFlowDAO from "../DAO/createFlowDAO";

const flowDAO = new createFlowDAO();

export default class createFlowInteractor {
  // Checks if flowName exists and is a string and uploads flow
  async flowUploader(flow) {
    if (typeof flow.flowName === "string" && flow.flowName !== "") {
      const res = await flowDAO.uploadFlow(flow);
      return res;
    }
  }
}
