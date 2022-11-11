export function parse(transcript) {
  const lst = [];
  for (var i = 0; i < transcript.questions.length; i++) {
    lst.push(createQAs(transcript.questions[i]));
  }
}

export function createQAs(qlist) {
  if (qlist.length == 0) {
    return null;
  }
  const initial = qlist[0].id;

  //qlist is a list of JSON objects that exists as questions
  for (var i = 0; i < qlist.length; i++) {
    createQA(qlist[i]);
  }

  // Return the id  of first item in the list which should be the top level question
  return initial;
}

function createQA(item) {}
