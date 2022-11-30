import axios from "axios";

// Given the session ID delete the flow alongside the transcript and QAs
export default function deleteFlow(flow, sessionID) {
  // Delete Transcript associated with flow
  const transcriptDeleted = false;
  removeTranscript(flow).then((res) => {
    transcriptDeleted = res;
  });
  console.log(transcriptDeleted);

  // Delete QAs associated with flow
  const qa_deleted = removeQAs(flow);
  console.log(qa_deleted, "QA Deleted");

  // Delete the flow itself
  const flowDeleted = false;
  removeFlow(sessionID).then((res) => {
    flowDeleted = res;
  });

  return transcriptDeleted && qa_deleted && flowDeleted;
}

// Axios Call to delete flow
async function removeFlow(sessionID) {
  axios
    .delete(`http://localhost:5000/flow/delete/${sessionID}`)
    .then((response) => {
      return response.status === 200;
    });
}

// Axios Call to Delete transcript
async function removeTranscript(flow) {
  const transcriptID = flow.transcriptID;
  axios
    .delete(`http://localhost:5000/transcript/delete/${transcriptID}`)
    .then((response) => {
      return response.status === 200;
    });
}

// Loops through the questions list in flow and deletes each item
async function removeQAs(flow) {
  for (const item in flow.allQuestions) {
    deleteqa(item).then((response) => {
      if (response.status === 400) {
        return false;
      }
    });
  }
  return true;
}

// Axios call to delete a single QA object
async function deleteqa(qa) {
  return axios.delete("http://localhost:5000/qa/delete", qa);
}
