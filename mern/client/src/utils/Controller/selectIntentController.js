import selectIntentInteractor from "../Interactor/selectIntentInteractor";

const selectInteractor = new selectIntentInteractor();

export default class selectIntentController {
  updateQA(qa) {
    return selectInteractor.updateQA(qa);
  }
}
