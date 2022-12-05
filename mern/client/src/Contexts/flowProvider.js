import React from "react";

export const FlowContext = React.createContext();

export default function FlowProvider({ children }) {
  // Stores the current Flow object that the user is working with.
  const [currFlow, setFlowState] = React.useState();

  // Stores list of starting questions for the flow
  const [flowStartingQuestions, setFlowStartingQuestions] = React.useState();

  // Stores list of all questions for the flow
  const [flowAllQuestions, setFlowAllQuestions] = React.useState();

  return (
    <FlowContext.Provider
      value={[
        currFlow,
        setFlowState,
        flowStartingQuestions,
        setFlowStartingQuestions,
        flowAllQuestions,
        setFlowAllQuestions,
      ]}
    >
      {children}
    </FlowContext.Provider>
  );
}
