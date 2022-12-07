import axios from "axios";

export async function saveSession(flow, qa, sessionID) {
  var checkFlow = false;
  await saveFlow(flow, qa, sessionID).then((res) => {
    if (res.status === 200) {
      checkFlow = true;
    }
  });

  var checkQA = false;
  await saveQA(qa).then((res) => {
    if (res.status === 200) {
      checkQA = true;
    }
  });

  return checkFlow && checkQA;
}

// Takes in a qa object and sessionID and updates the flow object
export async function saveQA(qa) {
  return await axios.put(`${process.env.REACT_APP_BACKEND_URL}/qa/update`, qa);
}

// Takes in the flow object, current question and session id to update the flow parameter with
// the current question
export async function saveFlow(flow, qa, sessionID) {
  flow.current_question = qa.id;
  return await axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/flow/update/${sessionID}`,
    flow
  );
}
