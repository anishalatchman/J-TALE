export default function GetFlowData(allQuestions) {
  const lst = [];

  console.log(allQuestions);

  for (var i = 0; i < allQuestions.length; i++) {
    if (allQuestions[i].question_included === true) {
      lst.push(sortQA(allQuestions[i]));
    }
  }

  return lst;
}

function sortQA(qa) {
  const intents = [];
  for (var i = 0; i < qa.intents.length; i++) {
    if (qa.intents[i].included) {
      intents.push(qa.intents[i]);
    }
  }
  qa.intents = intents;
  delete qa._id;
  delete qa.__v;
  return qa;
}
