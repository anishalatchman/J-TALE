import deleteSessionInteractor from "../Interactor/deleteSessionInteractor";
import { flowUploader } from "../startScreen";

//new instance of interactor class
const deleteInteractor = new deleteSessionInteractor();

export default class deleteController {
  //returns whether flow has been successfully deleted
  deleteFlow(flow, sessionID) {
    const transcriptID = flow.transcriptID;

    //Checks if all three deletion calls return true, indicating successful deletion
    const res =
      deleteInteractor.flowDeleted(sessionID) &&
      deleteInteractor.transcriptDeleted(transcriptID) &&
      deleteInteractor.qaDeleted(flowUploader);
    return res;
  }
}
