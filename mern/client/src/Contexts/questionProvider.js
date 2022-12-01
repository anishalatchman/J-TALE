import React from "react";

export const QuestionContext = React.createContext();

export default function QuestionProvider({ children }) {
  // stores the id of the set of questions to pass onto the following intent page
  const [QuestionState, setQuestionState] = React.useState([]);
  const [questions, setQuestions] = React.useState([]);
  const [allQuestions, setAllQuestions] = React.useState([]);
  const [prevPrompt, setPrevPrompt] = React.useState(
    '"How can I help you today?"'
  );

  return (
    <QuestionContext.Provider
      value={[
        QuestionState,
        setQuestionState,
        questions,
        setQuestions,
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
