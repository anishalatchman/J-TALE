import QA from "../models/question_answer.js";

export async function getQA(req) {
  const id = req.body.id;
  const qa = await QA.findOne({ id });

  if (!qa) {
    return 400, "No Qa Exists with Given Session ID";
  } else {
    return 200, { qa };
  }
}

export async function createQA(req) {
  const id = req.body.id;
  const question = req.body.question;
  const intent = req.body.intent;
  const question_included = req.body.question_included;

  const qa = await QA.create({
    id,
    question,
    intent,
    question_included,
  });

  try {
    return 200, { id: qa.id };
  } catch {
    return 400, "Invalid QA Data";
  }
}

export async function updateQA(req) {
  const id = req.body.id;
  const question = req.body.question;
  const intents = req.body.intents;
  const question_included = req.body.question_included;

  const qa = await QA.findOne({ id });

  if (!qa) {
    return 400, "QA not Found";
  }

  try {
    if (question) {
      qa.question = question;
    }
    if (intents) {
      qa.intents = intents;
    }
    if (question_included) {
      qa.question_included = question_included;
    }
    qa.save();
    return 200, { id: qa.id };
  } catch (error) {
    return 400, "Invalid Input Fields";
  }
}

export async function deleteQA(req) {
  const id = req.body.id;
  try {
    const qa = await QA.findOneAndDelete({ id });
    return 200, { qa };
  } catch (error) {
    return 400, "Unable to Delete QA";
  }
}
