import selectIntentDAO from "../DAO/selectIntentDAO";

const selectDAO = new selectIntentDAO();

export default class selectIntentInteractor {
  updateQA(qa) {
    return selectDAO.updateQA(qa);
  }
}
