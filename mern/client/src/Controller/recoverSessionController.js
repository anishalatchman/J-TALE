import { sendToDAO, getQAFromFlow } from "../Interactor/recoverSessionInteractor"

// returns starting QA pair from session ID
export async function recoverFlow(sessionID) {
    // returns flow promise object
    const flow = await sendToDAO(sessionID);
    const startingQA = getQAFromFlow(flow);
    return startingQA;
}

