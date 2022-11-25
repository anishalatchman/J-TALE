import { getFlowBySessionID } from "../DAO/recoverSessionDAO"
//  import dao to call axios function
// manipulate data

// sessionID does not need to be manipulated so this function sends it straight to DAO
export function sendToDAO(sessionID) {
    // returns a flow promise object
    getFlowBySessionID(sessionID).then(
        function returnStuff(flowObject) {
            console.log("this is the life", flowObject);
            return flowObject.data.flow.questions[0];
        }
    );
    // console.log("this is the QA pairs", flow.data.flow.questions)

}

// returns first QA pair from given flow object
export function getQAFromFlow(flowPromise) {
    flowPromise.then(
        function returnStartingQA(flowObject) {
            console.log("this is the flow object", flowObject);
            return flowObject.data.flow.questions[0];
        }
    );
}