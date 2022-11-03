import axios from "axios";

export function transcriptJSONConverter(fileName, body) {

  if (typeof fileName === "string") {
    const transcript = { name: fileName, data: body };
    uploadFile(transcript);
  }

}

export function uploadFile(transcript) {
  axios
    .post("http://localhost:5000/transcript/add", transcript)
    .then(() => {
      console.log("Transcript Uploaded!");
      return true;
    })
    .catch((e) => console.log(e.response.data));
}

