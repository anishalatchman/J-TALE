import React from "react";

export const ScrollerContext = React.createContext();

export default function ScrollerProvider({ children }) {
  // Stores the current QA object that the user is working with.
  const [speechList, setSpeechList] = React.useState([]);

  return (
    <ScrollerContext.Provider value={[speechList, setSpeechList]}>
      {children}
    </ScrollerContext.Provider>
  );
}
