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

  createQAs(transcript) {
    return uploadInteractor.parse(transcript);
  }

  getQAList(idList) {
    return uploadInteractor.getQAList(idList);
  }
}
