import React from "react";

export const qaContext = React.createContext();

export default function QAProvider({ children }) {
  // Stores the current QA object that the user is working with.
  const [currQA, setcurrQA] = React.useState();


  return (
    <qaContext.Provider value={[currQA, setcurrQA]}>
      {children}
    </qaContext.Provider>
  );
}
