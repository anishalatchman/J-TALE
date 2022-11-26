import axios from "axios";

async function uploadFlow(flow) {
  try {
    const res = await axios.post("http://localhost:5000/flow/add", flow);
    console.log("Flow Uploaded!");
    // this is going to return undefined because we can't access the response properly right now
    // but it will soon be fixed in the backend
    return res.data.questions;
  } catch (e) {
    return false;
  }
}

// Checks if flowName exists and is a string and uploads flow
export async function flowUploader(flowName, file) {
  if (typeof flowName === "string" && flowName !== "") {
    // Defines new obj flow in form required by mongoose schemas
    const flow = { name: flowName, questions: file.questions };
    const res = await uploadFlow(flow);
    return res;
  }
}
