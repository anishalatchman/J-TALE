import axios from "axios";

// Takes in a qa object and sessionID and updates the flow object
export async function saveQA(qa) {
  const res = await axios.put("http://localhost:5000/qa/update/", qa);

  if (res.status === 200) {
    return true;
  } else {
    return false;
  }
}

export async function saveFlow(flow, qa, sessionID) {
  flow.current_question = qa.id;
  const res = await axios.put(
    `http://locahost:5000/flow/update/${sessionID}`,
    flow
  );
  if (res.status === 200) {
    return true;
  } else {
    return false;
  }
}
