import axios from "axios";

// Takes in a qa object and sessionID and updates the flow object
export async function saveQA(qa) {
  var saved = false;
  await axios.put("http://localhost:5000/qa/update/", qa).then((res) => {
    if (res.status === 200) {
      saved = true;
    }
  });
  return saved;
}

export async function saveFlow(flow, qa, sessionID) {
  flow.current_question = qa.id;
  var saved = false;
  await axios
    .put(`http://locahost:5000/flow/update/${sessionID}`, flow)
    .then((res) => {
      if (res.status === 200) {
        saved = true;
      }
    });

  return saved;
}
