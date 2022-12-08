import selectIntentDAO from "../DAO/selectIntentDAO";

export default class selectIntentInteractor {
  constructor() {
    this.selectDAO = new selectIntentDAO();
  }
  updateQA(qa) {
    return this.selectDAO.updateQA(qa);
  }
}
