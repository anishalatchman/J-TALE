import axios from "axios";

var res;

async function uploadFile(transcript) {
  try {
    res = await axios.post("http://localhost:5000/transcript/add", transcript);
    console.log("Transcript Uploaded!");
    return res.data.id;
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

export async function deleteFile(id) {
  console.log(id);
  try {
    await axios.delete("http://localhost:5000/transcript/delete/" + id);
    console.log("Transcript Deleted!");
    return true;
  } catch (e) {
    return false;
  }
}
