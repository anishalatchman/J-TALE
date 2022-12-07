import React from "react";

export const QuestionContext = React.createContext();

export default function QuestionProvider({ children }) {
  // stores the id of the set of questions to pass onto the following intent page

  // isFirstQuestion is needed to hide "user:"" label on first question
  const [isFirstQuestion, setIsFirstQuestion] = React.useState(true);
  const [nextQuestions, setNextQuestions] = React.useState([]);
  // flowContext is question ID's, questionContext is json objects
  const [allQuestions, setAllQuestions] = React.useState([]);
  const [prevPrompt, setPrevPrompt] = React.useState(
    'This is the start of your flow.'
  );

  return (
    <QuestionContext.Provider
      value={[
        isFirstQuestion,
        setIsFirstQuestion,
        nextQuestions,
        setNextQuestions,
        allQuestions,
        setAllQuestions,
        prevPrompt,
        setPrevPrompt,
      ]}
    >
      {children}
    </QuestionContext.Provider>
  );
}
