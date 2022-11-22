import Transcript from "../models/transcript.model.js";

export async function getTranscript(req) {
  try {
    const transcript = await Transcript.findById(req.params.id);
    if (transcript) {
      return 200, transcript;
    }
  } catch (error) {
    return 400, "No Transcripts Exist";
  }
}

export async function createTranscript(req) {
  const id = req.body.id;
  const name = req.body.name;
  const data = req.body.data;

  const transcriptExists = await Transcript.findOne({ id });

  if (transcriptExists) {
    return 400, "Card already exists";
  }
  const transcript = await Transcript.create({
    name,
    data,
  });
  if (transcript) {
    return (
      200,
      {
        id: transcript.id,
        name: transcript.name,
      }
    );
  } else {
    return 400, "Invalid transcript Data";
  }
}

export const createTranscriptAPI = asyncHandler(async (req, res) => {
  const VOICEFLOW_API_KEY = process.env.VOICEFLOW_API_KEY;
  const VERSION_ID = process.env.VERSION_ID;
  const url = `https://api-dm-test.voiceflow.fr/exportraw/${VOICEFLOW_API_KEY}?versionID=${VERSION_ID}`;

  try {
    new Transcript({ name: req.body.name, data: body.toString() })
      .save()
      .then(() => {
        return 200, { id };
      });
  } catch (error) {
    return 400, "Error: " + err;
  }
});

export async function updateTranscript(req) {
  const transcript = await Transcript.findById(user.params.id);

  if (!transcript) {
    400, "Transcript not Found";
  }

  try {
    if (req.body.name) {
      transcript.name = req.body.name;
    }
    if (req.body.data) {
      transcript.data = req.body.data;
    }
    transcript.save();
    return 200, transcript.id;
  } catch (error) {
    return 400, "Invalid Input Fields";
  }
}

export async function deleteTranscript(req) {
  try {
    const transcript = await Transcript.findByIdAndDelete(req.params.id);
    return 200, transcript;
  } catch (error) {
    return 400, "Unable to Delete Transcript";
  }
}
