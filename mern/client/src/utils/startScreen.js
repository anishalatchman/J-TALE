import axios from "axios";

var res;

async function uploadFlow(flow) {
  try {
    res = await axios.post("http://localhost:5000/flow/add", flow);
    console.log("Flow Uploaded!");
    // return res;
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
    res = await uploadFlow(flow);
    return res;
  }
}
