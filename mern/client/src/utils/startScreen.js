import axios from "axios";

async function uploadFlow(flow) {
  try {
    const res = await axios.post("http://localhost:5000/flow/add", flow);
    console.log("Flow Uploaded!");
    return { status: true, res: res };
  } catch (e) {
    return { status: false };
  }
}

// Checks if flowName exists and is a string and uploads flow
export async function flowUploader(
  flowName,
  flowStartingQuestions,
  flowAllQuestions,
  transcriptID
) {
  if (typeof flowName === "string" && flowName !== "") {
    // Defines new obj flow in form required by mongoose schemas
    const flow = {
      name: flowName,
      questions: flowStartingQuestions,
      allQuestions: flowAllQuestions,
      transcriptID: transcriptID,
    };
    const res = await uploadFlow(flow);
    return res;
  }
}
