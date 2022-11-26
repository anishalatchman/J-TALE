import { getFlowBySessionID } from "../DAO/recoverSessionDAO"
//  import dao to call axios function
// manipulate data

// sessionID does not need to be manipulated so this function sends it straight to DAO
export async function sendToDAO(sessionID) {
    // returns a flow promise object
    const flow = await getFlowBySessionID(sessionID);
    console.log("this is the flow", flow);
    return flow;

}

// returns first QA pair from given flow promise object
export function getQAFromFlow(flowPromise) {
    console.log("this is the QA from teh flow", flowPromise.flow.questions[0]); 
    return flowPromise.flow.questions[0];
}

    // flowPromise.then(
    //     function returnStartingQA(flowObject) {
    //         // this flowObject is undefined :/
