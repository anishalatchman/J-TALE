import React from "react";

export const SpeakerContext = React.createContext();

export default function SpeakerProvider({ children }) {
  // Keeping track of who the speaker is when choosing intent & in transcript
  const [currSpeaker, setSpeaker] = React.useState("User:");
  const [prevSpeaker, setPrevSpeaker] = React.useState("Bot:");

  return (
    <SpeakerContext.Provider
      value={[currSpeaker, setSpeaker, prevSpeaker, setPrevSpeaker]}
    >
      {children}
    </SpeakerContext.Provider>
  );
}
