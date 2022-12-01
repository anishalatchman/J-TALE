import React, { useEffect } from "react";

export const QuestionContext = React.createContext();

export default function QuestionProvider({ children }) {
  // stores the id of the set of questions to pass onto the following intent page
  const [QuestionState, setQuestionState] = React.useState([]);
  const [questions, setQuestions] = React.useState([]);
  const [allQuestions, setAllQuestions] = React.useState([]);

  useEffect(() => {
    console.log(questions, "QUESTIONS");
    console.log(allQuestions, "ALLQUESTIONS");
  }, [questions, allQuestions]);
  return (
    <QuestionContext.Provider
      value={[
        QuestionState,
        setQuestionState,
        questions,
        setQuestions,
        allQuestions,
        setAllQuestions,
      ]}
    >
      {children}
    </QuestionContext.Provider>
  );
}
