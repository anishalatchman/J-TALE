import axios from "axios";
import e from "cors";

export function transcriptJSONConverter(fileName, body) {
  console.log(typeof fileName);
  if (typeof fileName === "string") {
    const transcript = { name: fileName, data: body };
    console.log(1);
    uploadFile(transcript);
  }
}

export function uploadFile(transcript) {
  console.log(2);
  axios
    .post("http://localhost:5000/transcript/add", transcript)
    .then(console.log("Transcript Uploaded!"))
    .catch((e) => console.log(e.response.data));
}
