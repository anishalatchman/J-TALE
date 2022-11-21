import QA from "../models/question_answer.js";

//Parses the transcript by looking through each 'list' of questions and creating question answer pairs
//See trancript JSON formatting for more details
export default function parse(transcript) {
  const lst = [];
  for (var i = 0; i < transcript.length; i++) {
    createQAs(transcript[i]);
    lst.push(initialQAID(transcript[i]));
  }
  console.log(lst);
  return lst;
}

//Loops through all questions in the JSON object qlist, making them into objects in the databse
export function createQAs(qlist) {
  //qlist is a list of JSON objects that exists as questions/answer pairs
  for (var i = 0; i < qlist.length; i++) {
    createQA(qlist[i]);
  }
}

// Returns a list of the initial QA ids
export function initialQAID(qlist) {
  if (qlist.length == 0) {
    return null;
  }
  return qlist[0].id; // Return the first item in the list which should be the top level question
}

//Creates a QA item in the database
export function createQA(item) {
  try {
    const id = item.id;
    const question = item.question;
    const question_included = item.question_included;
    const intents = item.intents;
    // Checks to see that all subvalues are defined and question id is unique
    if (isValidItem(item)) {
      QA.create({
        id,
        question,
        question_included,
        intents,
      });
      return true;
    }
    return false;
  } catch (e) {
    console.log(e.message);
    return false;
  }
}

export function isValidItem(item) {
  const id = item.id;
  const question = item.question;
  const question_included = item.question_included;
  const intents = item.intents;
  if (
    typeof id === "undefined" ||
    typeof question === "undefined" ||
    typeof question_included === "undefined" ||
    typeof intents === "undefined" ||
    typeof intents.value === "undefined" ||
    typeof intents.included === "undefined" ||
    typeof intents.children === "undefined" ||
    QA.findOne({ id: id })
  ) {
    return false;
  }
  return true;
}
