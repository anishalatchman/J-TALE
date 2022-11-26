import { sendToDAO, getQAFromFlow } from "../Interactor/recoverSessionInteractor"

// returns starting QA pair from session ID
export async function recoverFlow(sessionID) {
    // returns flow promise object
    const flow = await sendToDAO(sessionID);
    // console.log("this is the flow", flow);
    const startingQA = getQAFromFlow(flow);
    return startingQA;
}



// ALT get flow method if getFlow doesn't work??
// Flow.find({ 'name': sessionID }, function(err, flows) {
//     if (err) throw err;
  
//     // 'flows' is an array of the Flow objects retrieved.
//     flows.forEach(function(flow) {
//       // Do something with the questions.
//       console.log(flow.questions);
//     });
//   });