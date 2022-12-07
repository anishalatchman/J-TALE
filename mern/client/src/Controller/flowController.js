import { sendToDAO } from "../Interactor/flowInteractor"

// returns starting QA pair from session ID
export async function recoverFlow(sessionID) {
    // returns flow object
    const flow = await sendToDAO(sessionID);
    return flow;
}

