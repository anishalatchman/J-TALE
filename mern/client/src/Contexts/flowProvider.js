import React from "react";

export const FlowContext = React.createContext();

export default function FlowProvider({ children }) {
  // Stores the current Flow JSON object that the user is working with.
  const [currFlow, setFlowState] = React.useState();

  // Stores list of starting question IDS for the flow
  const [flowStartingQuestions, setFlowStartingQuestions] = React.useState();

  // Stores list of all question IDS for the flow
  // flowContext is question ID's, questionContext is json objects
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
