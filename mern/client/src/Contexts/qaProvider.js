import React from "react";

export const qaContext = React.createContext();

export default function QAProvider({ children }) {
  // Stores the current QA object that the user is working with.
  const [currQA, setcurrQA] = React.useState(
    // {
    // id: '00000000', 
    // question: 'What kind of pizza do you want to order?', 
    // question_included: false, 
    // intents: [{
    //   children: ['00000001', '00000010'],
    //   included: false,
    //   value : "cheese"}]}
  );


  return (
    <qaContext.Provider value={[currQA, setcurrQA]}>
      {children}
    </qaContext.Provider>
  );
}
