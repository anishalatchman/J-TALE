import createFlowInteractor from "../Interactor/createFlowInteractor";

const flowInteractor = new createFlowInteractor();

export default class createFlowController {
  // Creates flow object, checks if flowName exists and is a string and uploads flow
  async flowUploader(
    flowName,
    flowStartingQuestions,
    flowAllQuestions,
    transcriptID
  ) {
    // Defines new obj flow in form required by mongoose schemas
    const flow = {
      name: flowName,
      questions: flowStartingQuestions,
      allQuestions: flowAllQuestions,
      transcriptID: transcriptID,
    };
    return flowInteractor.flowUploader(flow);
  }
}
