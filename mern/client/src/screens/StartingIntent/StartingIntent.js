import React, { useContext } from "react";
import styles from "./StartingIntent.module.css";
import "./../../Components/Buttons/ButtonStyleSheet.css";
import GenericButton from "../../Components/Buttons/GenericButton";
import IntentButtons from "../../Components/IntentButtons/IntentButtons";
// import { useNavigate } from "react-router-dom";
import Scrollbar from "../../Components/TranscriptScroller/transcript-scroller.component";
import { recoverFlow } from "../../Controller/recoverSessionController"
// import { deleteFile } from "../../utils/transcript";
import { SessionContext } from "../../Contexts/sessionProvider";
import { SpeakerContext } from "../../Contexts/speakerProvider";
import { IntentContext } from "../../Contexts/intentsProvider";

function StartingIntent() {
  const [sessionID, , ] = useContext(SessionContext);
  const [currSpeaker, setSpeaker, prevSpeaker, setPrevSpeaker] =
    useContext(SpeakerContext);
  const [intentState] = useContext(IntentContext);
  // const Navigate = useNavigate();

  // const PageChange = (url) => {
  //   Navigate(url);
  // };

  const handleSpeakerChange = () => {
    const prev = prevSpeaker;
    const curr = currSpeaker;
    setPrevSpeaker(curr);
    setSpeaker(prev);
  };
  // send session id to frontend controller which sends down to frontend dao which does axios call to backend
  // need to wait for async recoverFlow to return startingQA

  const LoadSession = async () => {
    // retrieve starting qa's if session id is set
    if (sessionID) {
      const startingQA = await recoverFlow(sessionID);
      console.log("This is the current QA from RecoverSession: ", startingQA);
    }
  };

  LoadSession();

  // dummy intent for testing purposes
  const intent = [
    {
      value: "cheese",
      included: false,
      children: ["00000001", "00000010"],
    },
    {
      value: "pepperoni",
      included: false,
      children: ["00000011", "00000100"],
    },
    {
      value: "hawaiian",
      included: false,
      children: ["00000101", "00000110"],
    },
  ];

  return (
    <div className="container">
      <div className="scroller">
        <Scrollbar />
      </div>
      <div className={styles.intentContainer}>
        <h4 className={styles.speaker1}>{prevSpeaker}</h4>
        <h1 className={styles.intentTitle}>"How can I help you today?"</h1>
        <h4 className={styles.speaker2}>{currSpeaker}</h4>

        <div>
          <IntentButtons intents={intent}></IntentButtons>
        </div>
        <div>
          <h4 className={styles.instructions}>
            Select intents you would like to include by clicking once.
          </h4>
          <h4 className={styles.instructions1}>
            Choose a specific path by clicking again and selecting next.
          </h4>
        </div>
        <div className={styles.buttonContainer}>
          <GenericButton
            buttonType="outline"
            text={"Go Back"}
            disabled={false}
            onClick={() => {
              // need to delete file and reset sessionID on navbar logo click, not on back button
              // setSessionID();
              // deleteFile(transcriptID);
            }}
          />
          <GenericButton
            buttonType={
              Object.values(intentState).some((x) => x === 2)
                ? "blue"
                : "disabled"
            }
            text={"Next"}
            disabled={
              Object.values(intentState).some((x) => x === 2) ? false : true
            }
            onClick={() => {
              handleSpeakerChange();
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default StartingIntent;
