import React, { useContext } from "react";
import styles from "./StartingIntent.module.css";
import "./../../Components/Buttons/ButtonStyleSheet.css";
import GenericButton from "../../Components/Buttons/GenericButton";
import IntentButtons from "../../Components/IntentButtons/IntentButtons";
import Scrollbar from "../../Components/TranscriptScroller/transcript-scroller.component";
import { SpeakerContext } from "../../Contexts/speakerProvider";
import { IntentContext } from "../../Contexts/intentsProvider";
import { qaContext } from "../../Contexts/qaProvider";

function StartingIntent() {
  const [currQA, ] = useContext(qaContext)
  const [currSpeaker, setSpeaker, prevSpeaker, setPrevSpeaker] =
    useContext(SpeakerContext);
  const [intentState] = useContext(IntentContext);

  const handleSpeakerChange = () => {
    const prev = prevSpeaker;
    const curr = currSpeaker;
    setPrevSpeaker(curr);
    setSpeaker(prev);
  };

  // dummy intent for testing purposes
  // EQUIV to currQA.intents
  // const intent = [
  //   {
  //     value: "cheese",
  //     included: false,
  //     children: ["00000001", "00000010"],
  //   },
  //   {
  //     value: "pepperoni",
  //     included: false,
  //     children: ["00000011", "00000100"],
  //   },
  //   {
  //     value: "hawaiian",
  //     included: false,
  //     children: ["00000101", "00000110"],
  //   },
  // ];

  return (
    <div className="container">
      <div className="scroller">
        <Scrollbar />
      </div>
      <div className={styles.intentContainer}>
        <h4 className={styles.speaker1}>{prevSpeaker}</h4>
        <h1 className={styles.intentTitle}>{currQA.question}</h1>
        <h4 className={styles.speaker2}>{currSpeaker}</h4>

        <div>
          <IntentButtons intents={currQA.intents}></IntentButtons>
        </div>
        <div>
          <h4 className={styles.instructions}>
            Select intents you would like to include by <strong>clicking once</strong>.
          </h4>
          <h4 className={styles.instructions1}>
            Choose a specific path by <strong>clicking again</strong> and selecting next.
          </h4>
        </div>
        <div className={styles.buttonContainer}>
          <GenericButton
            buttonType="outline"
            text={"Go Back"}
            disabled={false}
            onClick={() => {
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
