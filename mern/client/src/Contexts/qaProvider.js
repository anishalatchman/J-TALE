import React from "react";

export const qaContext = React.createContext();

export default function qaProvider({ children }) {
  // Stores the current QA object that the user is working with.
  const [currQA, setIntentState] = React.useState({});

  return (
    <IntentContext.Provider value={[currQA, setIntentState]}>
      {children}
    </IntentContext.Provider>
  );
}
