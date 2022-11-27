import React from "react";

export const IntentContext = React.createContext();

export default function IntentProvider({ children }) {
  // states to control the background colour and logic of intent buttons
  const [intentState, setIntentState] = React.useState({});
  // the dictionary is a mapping with values as the intents to the state of their buttons
  // the length of the dictionary will depend on the number of intents

  return (
    <IntentContext.Provider value={[intentState, setIntentState]}>
      {children}
    </IntentContext.Provider>
  );
}
