import axios from "axios";

var res

// Sends Transcript to Database
async function uploadFile(transcript) {

  axios
    .post("http://localhost:5000/transcript/add", transcript)
    .then(() => {
      console.log("Transcript Uploaded!");
      return true
    })
    .catch((e) => {
      return e.response.data
    });
  
} 

// Checks if transcript file is a string and calls Upload Transcript
export async function transcriptJSONConverter(fileName, body) {

  if (typeof fileName === "string") {

    // Defines new obj transcript in form required by mongoose schemas
    const transcript = { name: fileName, data: body };
    res = await uploadFile(transcript);
    console.log(res)
    return res
  }
}

