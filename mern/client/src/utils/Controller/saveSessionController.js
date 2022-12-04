import saveSessionInteractor from "../Interactor/saveSessionInteractor";

const saveInteractor = new saveSessionInteractor();

export default class saveSessionController {
  //Takes in flow object, qa, sessionID to update the flow object and save it to the DB
  saveFlow(flow, qa, sessionID) {
    saveInteractor.updateCurrQuestion(flow, qa);
    saveInteractor.saveFlow(flow, sessionID);
  }
}
