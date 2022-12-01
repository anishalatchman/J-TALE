import axios from "axios";

// Given the session ID delete the flow alongside the transcript and QAs
export async function deleteFlow(flow, sessionID) {
  // Delete Transcript associated with flow

  var transcriptDeleted = false;
  await removeTranscript(flow).then((response) => {
    if (response.status === 200) {
      transcriptDeleted = true;
    }
  });

  // Delete QAs associated with flow
  var qaDeleted = false;
  await removeQAs(flow).then((res) => {
    qaDeleted = res;
  });

  // Delete the flow itself
  var flowDeleted = false;
  await removeFlow(sessionID).then((response) => {
    if (response.status === 200) {
      FlowDeleted = true;
    }
  });

  return transcriptDeleted && qaDeleted && flowDeleted;
}

// Axios Call to delete flow
async function removeFlow(sessionID) {
  const res = await axios.delete(
    `http://localhost:5000/flow/delete/${sessionID}`
  );
  return res;
}

// Axios Call to Delete transcript
async function removeTranscript(flow) {
  const transcriptID = flow.transcriptID;
  const res = await axios.delete(
    `http://localhost:5000/transcript/delete/${transcriptID}`
  );
  return res;
}

// Loops through the questions list in flow and deletes each item
async function removeQAs(flow) {
  for (var i = 0; i < flow.allQuestions.length; i++) {
    console.log(flow.allQuestions[i]);
    try {
      await deleteqa(flow.allQuestions[i]);
    } catch {
      return false;
    }
  }
  return true;
}

// Axios call to delete a single QA object
async function deleteqa(qa) {
  await axios.delete("http://localhost:5000/qa/delete", {
    data: { id: qa },
  });
}
