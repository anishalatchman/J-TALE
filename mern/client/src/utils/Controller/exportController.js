import exportInteractor from "../Interactor/exportInteractor";

//New instance of the interactor class
const interactor = new exportInteractor();

export default class exportController {
  //Calls getFlowData to get the list of all question objects that are 'included'
  exportTranscript(allQuestions) {
    return interactor.getFlowData(allQuestions);
  }
}
