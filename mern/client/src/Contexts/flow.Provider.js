import React from "react";

export const FlowContext = React.createContext();

export default function FlowProvider({ children }) {
  // Stores the current Flow object that the user is working with.
  const [currFlow, setFlowState] = React.useState();

  return (
    <FlowContext.Provider value={[currFlow, setFlowState]}>
      {children}
    </FlowContext.Provider>
  );
}
