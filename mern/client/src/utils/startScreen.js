// startScreen should contain function that creates starting flow:
// after button is clicked, pass a transcript and flow name entered into function.
// this function should contain axios call that creates the flow.
// this axios call then gives a response that is a string of ids. this string of ids is the first set of questions
// that we want to display to the users on the starting intent screen.

import axios from "axios";
// import { useCallback } from "react";

async function uploadFile(name, transcript) {
  try {
    await axios.post("http://localhost:5000/flow/add", { name, transcript });
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
    console.log(res);
    return res;
  }
}
