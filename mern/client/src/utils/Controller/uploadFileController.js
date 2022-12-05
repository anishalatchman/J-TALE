import uploadFileInteractor from "../Interactor/uploadFileInteractor";

const uploadInteractor = new uploadFileInteractor();

export default class uploadFileController {
  uploadFile(fileName, body) {
    const transcript = { name: fileName, data: body };
    return uploadInteractor.uploadFile(transcript);
  }

  deleteFile(id) {
    return uploadInteractor.deleteFile(id);
  }

  //Parses transcript and then creates QA pairs in the DB
  createQAs(transcript) {
    return uploadInteractor.parse(transcript);
  }

  getQAList(idList) {
    return uploadInteractor.getQAList(idList);
  }

  deleteQAs(flowAllQuestions) {
    return uploadInteractor.qaDeleted(flowAllQuestions);
  }
}
