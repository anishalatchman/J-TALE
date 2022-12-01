import React, { useContext, useEffect, useState } from "react";
import styles from "./StartingIntent.module.css";
import "./../../Components/Buttons/ButtonStyleSheet.css";
import GenericButton from "../../Components/Buttons/GenericButton";
import IntentButtons from "../../Components/IntentButtons/IntentButtons";
import { useNavigate } from "react-router-dom";
import Scrollbar from "../../Components/TranscriptScroller/transcript-scroller.component";
import { deleteFile } from "../../utils/transcript";
import { SessionContext } from "../../Contexts/sessionProvider";
import { SpeakerContext } from "../../Contexts/speakerProvider";
import { IntentContext } from "../../Contexts/intentsProvider";
import { QuestionContext } from "../../Contexts/questionProvider";

function StartingIntent() {
  const [, , transcriptID] = useContext(SessionContext);
  const [currSpeaker, setSpeaker, prevSpeaker, setPrevSpeaker] =
    useContext(SpeakerContext);
  const [intentState] = useContext(IntentContext);
  const Navigate = useNavigate();
  const PageChange = (url) => {
    Navigate(url);
  };
  const [currIntents, setCurrIntents] = useState();
  const [, , questions, setQuestions, allQuestions] =
    useContext(QuestionContext);
  const [buttons, setButtons] = useState(false);

  const handleSpeakerChange = () => {
    const prev = prevSpeaker;
    const curr = currSpeaker;
    setPrevSpeaker(curr);
    setSpeaker(prev);
    setButtons(!buttons);
  };

  useEffect(() => {
    console.log(questions, "STARTING QUESTIONS");
    console.log(allQuestions, "STARTING ALL QUESTIONS");
    console.log(buttons, "BUTTONS");
  }, [questions, buttons, allQuestions]);
  const handleQAChange = () => {
    //Gets the speech of the button that is selected
    const speech = Object.keys(intentState).find((x) => intentState[x] === 2);
    if (!buttons) {
      setCurrIntents(questions.find((x) => x.question === speech));
    } else {
      console.log(currIntents);
      const intent = currIntents.intents.find((x) => x.value === speech);
      try {
        const lst = [];
        allQuestions.forEach((x) => {
          if (intent.children.includes(x.id)) {
            lst.push(x);
          }
        });
        console.log(lst, "list");
        setQuestions(lst);
      } catch (e) {
        alert("ERROR GETTING QUESTIONS. PLEASE TRY AGAIN");
      }
    }
    // After successful change resets intentState values to 0
    Object.keys(intentState).forEach((key) => {
      intentState[key] = 0;
    });
  };

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
          <IntentButtons
            intents={buttons ? currIntents.intents : questions}
            user={buttons}
          />
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
              PageChange("/upload");
              deleteFile(transcriptID);
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
              handleQAChange();
              handleSpeakerChange();
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default StartingIntent;
