export default class exportInteractor {
  // Sorts through list of all questiosn and finds questions with included property
  getFlowData(allQuestions) {
    const lst = [];

    for (var i = 0; i < allQuestions.length; i++) {
      if (allQuestions[i].question_included === true) {
        lst.push(this.sortQA(allQuestions[i]));
      }
    }
    return lst;
  }

  // Sorts through question.intents and returns object with intent.included property to be true
  sortQA(qa) {
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
}
