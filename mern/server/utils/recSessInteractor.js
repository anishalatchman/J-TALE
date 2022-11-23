import { getFlow } from "../controller/flow";
import { SessionProvider, SessionContext } from "../../client/src/Contexts/sessionProvider";
import { getQA } from "../controller/question_answer";
// NOTE: This file needs to be wrapped in <SessionProvider> where it gets used in upper layers

// recoverSession - Makes Session ID Get Request
// Paramater: sessionID
// Return: Starting QA object

function recoverSession(sessionID) {
    <SessionProvider>
        {/* Will the imports work within the SessionProvider? */}
    const [, , sessionid, setSessionID] = useContext(SessionContext);
    flow = getFlowByID(sessionID);
    startingQA = getQAFromFlow(flow);
    return startingQA;
    </SessionProvider>
}

// getQAFromFlow - Retrieves first question paramter from flow object
// Paramater: flow object
// Return: Starting QA object

function getQAFromFlow(flow) {
    startingQA = flow.questions[0][0];
    return startingQA;
}

// Possible axios get call?
async function getFlowByID(sessionID) {
    try {
      res = await axios.get("http://localhost:5000/flow/:" + {sessionID}, sessionID);
      console.log(res.config.data);
      console.log("Flow Retrieved");
      return res;
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