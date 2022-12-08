import recoverSessionInteractor from "../Interactor/recoverSessionInteractor";

const recoverInteractor = new recoverSessionInteractor();

export default class recoverSessionController {
  recoverStartingQA(flow) {
    // returns QA object from ID
    const startingQA = recoverInteractor.getQA(flow);
    return startingQA;
  }

  recoverFlow(sessionID) {
    // returns flow object
    const flow = recoverInteractor.getFlow(sessionID);
    return flow;
  }
}
