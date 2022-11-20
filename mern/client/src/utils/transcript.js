import axios from "axios";
// import { useCallback } from "react";

var res;

// Sends Transcript to Database
// async function uploadFile(transcript) {
//   axios
//     .post("http://localhost:5000/transcript/add", transcript)
//     .then(() => {
//       console.log("Transcript Uploaded!");
//       return true;
//     })
//     .catch((e) => {
//       return e.response.data;
//     });
// }

async function uploadFile(transcript) {
  try {
    await axios.post("http://localhost:5000/transcript/add", transcript);
    console.log("Transcript Uploaded!");
    return true;
  } catch (e) {
    return false;
  }
}

// Checks if transcript file is a string and calls Upload Transcript
export async function transcriptJSONConverter(fileName, body) {
  if (typeof fileName === "string") {
    // Defines new obj transcript in form required by mongoose schemas
    const transcript = { name: fileName, data: body };
    res = await uploadFile(transcript);
    return res;
  }
}
