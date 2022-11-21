// startScreen should contain function that creates starting flow:
// after button is clicked, pass a transcript and flow name entered into function.
// this function should contain axios call that creates the flow.
// this axios call then gives a response that is a string of ids. this string of ids is the first set of questions
// that we want to display to the users on the starting intent screen.

import axios from "axios";
// import { useCallback } from "react";

var res;

async function uploadFlow(flow) {
  try {
    await axios.post("http://localhost:5000/flow/add", flow);
    console.log("Flow Uploaded!");
    return true;
  } catch (e) {
    return false;
  }
}

// Checks if transcript file is a string and calls Upload Transcript
export async function flowUploader(flowName, file) {
  if (typeof flowName === "string") {
    // Defines new obj flow in form required by mongoose schemas
    const flow = { name: flowName, questions: file };
    res = await uploadFlow(flow);
    return res;
  }
}
