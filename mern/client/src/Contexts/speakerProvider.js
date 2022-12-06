import React from "react";

export const SpeakerContext = React.createContext();

export default function SpeakerProvider({ children }) {
  // Keeping track of who the speaker is when choosing intent & in transcript
  const [currSpeaker, setSpeaker] = React.useState("Bot:");
  const [prevSpeaker, setPrevSpeaker] = React.useState("User:");

  return (
    <SpeakerContext.Provider
      value={[currSpeaker, setSpeaker, prevSpeaker, setPrevSpeaker]}
    >
      {children}
    </SpeakerContext.Provider>
  );
}
