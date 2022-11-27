import React from "react";

export const SessionContext = React.createContext();

export default function SessionProvider({ children }) {
  // use existence of sessionID to show or hide session id/save/delete buttons on navBar
  const [sessionID, setSessionID] = React.useState("");
  const [transcriptID, setTranscriptID] = React.useState();


  return (
    <SessionContext.Provider
      value={[sessionID, setSessionID, transcriptID, setTranscriptID]}
    >
      {children}
    </SessionContext.Provider>
  );
}
