import React from "react";

export const SessionContext = React.createContext();

export default function SessionProvider({ children }) {
  // states to control the background colour and logic of intent buttons
  const [navState, setNavState] = React.useState(false);

  return (
    <SessionContext.Provider value={[navState, setNavState]}>
      {children}
    </SessionContext.Provider>
  );
}
