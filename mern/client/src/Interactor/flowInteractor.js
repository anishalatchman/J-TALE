import { getFlowBySessionID } from "../DAO/flowDAO"
//  import dao to call axios function
// manipulate data

// sessionID does not need to be manipulated so this function sends it straight to DAO
export async function sendToDAO(sessionID) {
    // returns a flow object
    const flow = await getFlowBySessionID(sessionID);
    console.log("this is the flow object", flow);
    return flow;
}