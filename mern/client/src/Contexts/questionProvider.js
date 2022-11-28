import React from "react";

export const QuestionContext = React.createContext();

export default function QuestionProvider({ children }) {
  // stores the id of the set of questions to pass onto the following intent page
  const [QuestionState, setQuestionState] = React.useState();

  return (
    <QuestionContext.Provider value={[QuestionState, setQuestionState]}>
      {children}
    </QuestionContext.Provider>
  );
}
