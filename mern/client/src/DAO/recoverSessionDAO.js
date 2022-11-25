import axios from 'axios';
// axios call in here
// DAO is the inner most layer because DB stores our entities (flow, QA, transcript)

// Returns flow json object with matching sessionID
export async function getFlowBySessionID(sessionID) {
    try {
      await axios.get(`http://localhost:5000/flow/${sessionID}`, sessionID).then(
        function returnFlowObject(response) {
          // console.log("this is the response object QA pairs", response.data.flow.questions);
          // return flow json object
          return response;
        }
      );
    } catch (e) {
      return false;
    }
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

// recoverSession - Makes Session ID Get Request
// Paramater: sessionID from screens/recoverSession.js
// Return: Starting QA object
// function recoverSession(sessionID) {
//     flow = getFlowByID(sessionID);
//     startingQA = getQAFromFlow(flow);
//     return startingQA;
// }

// // getQAFromFlow - Retrieves first question paramter from flow object
// // Paramater: flow object
// // Return: Starting QA object
// function getQAFromFlow(flow) {
//     startingQA = flow.questions[0][0];
//     return startingQA;
// }