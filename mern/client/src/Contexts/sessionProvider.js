import React from "react";

export const SessionContext = React.createContext();

export default function SessionProvider({ children }) {
  // nav state to show or hide session id/save/delete buttons
  const [navState, setNavState] = React.useState(false);
  // Stores the transcript ID when beginning/resuming session so we can pass it onto other functions like deleting the transcript
  const [transcriptID, setTranscriptID] = React.useState();

  return (
    <SessionContext.Provider
      value={[navState, setNavState, transcriptID, setTranscriptID]}
    >
      {children}
    </SessionContext.Provider>
  );
}
