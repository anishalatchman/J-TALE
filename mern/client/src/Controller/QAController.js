import { sendToDAO, getQAIDFromFlow } from "../Interactor/QAInteractor"

// returns starting QA object from QA ID
export async function recoverStartingQA(flow) {
    // retrieves current QA ID from flow object
    const qaID = getQAIDFromFlow(flow);
    // returns QA object from ID
    const startingQA = await sendToDAO(qaID);
    return startingQA;
}