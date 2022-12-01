import React, { useContext, useState } from "react";
import styles from "./StartingIntent.module.css";
import "./../../Components/Buttons/ButtonStyleSheet.css";
import GenericButton from "../../Components/Buttons/GenericButton";
import IntentButtons from "../../Components/IntentButtons/IntentButtons";
// import { useNavigate } from "react-router-dom";
import Scrollbar from "../../Components/TranscriptScroller/transcript-scroller.component";
import { SpeakerContext } from "../../Contexts/speakerProvider";
import { IntentContext } from "../../Contexts/intentsProvider";
import { QuestionContext } from "../../Contexts/questionProvider";
import { ScrollerContext } from "../../Contexts/scrollerProvider";

function StartingIntent() {
  const [currSpeaker, setSpeaker, prevSpeaker, setPrevSpeaker] =
    useContext(SpeakerContext);
  const [intentState] = useContext(IntentContext);
  // const Navigate = useNavigate();
  // const PageChange = (url) => {
  //   Navigate(url);
  // };
  const [currIntents, setCurrIntents] = useState();
  const [
    ,
    ,
    questions,
    setQuestions,
    allQuestions,
    ,
    prevPrompt,
    setPrevPrompt,
  ] = useContext(QuestionContext);
  const [speechList, setSpeechList] = useContext(ScrollerContext);

  const [buttons, setButtons] = useState(false);

  const handleSpeakerChange = () => {
    const prev = prevSpeaker;
    const curr = currSpeaker;
    setPrevSpeaker(curr);
    setSpeaker(prev);
    setButtons(!buttons);
  };

  const handleQAChange = () => {
    //Gets the speech of the button that is selected
    const speech = Object.keys(intentState).find((x) => intentState[x] === 2);
    if (!buttons) {
      setCurrIntents(questions.find((x) => x.question === speech));
    } else {
      const intent = currIntents.intents.find((x) => x.value === speech);
      try {
        const lst = [];
        allQuestions.forEach((x) => {
          if (intent.children.includes(x.id)) {
            lst.push(x);
          }
        });
        setQuestions(lst);
      } catch (e) {
        alert("ERROR GETTING QUESTIONS. PLEASE TRY AGAIN");
      }
    }
    // After successful change resets intentState values to 0
    Object.keys(intentState).forEach((key) => {
      intentState[key] = 0;
    });
    setPrevPrompt(speech);
    setSpeechList([...speechList, { source: currSpeaker, text: speech }]);
  };

  return (
    <div className="container">
      <div className={styles.scroller}>
        <Scrollbar />
      </div>
      <div className={styles.intentContainer}>
        <h4 className={styles.speaker1}>{prevSpeaker}</h4>
        <h1 className={styles.intentTitle}>{prevPrompt}</h1>

        <div>
          {questions.length === 0 || currIntents?.intents?.length === 0 ? (
            <>
              <h3 className={styles.completed}>
                Your flow has been completed! Click the transcript to jump back.
              </h3>
            </>
          ) : (
            <>
              <h4 className={styles.speaker2}>{currSpeaker}</h4>

              <IntentButtons
                intents={buttons ? currIntents.intents : questions}
                user={buttons}
              />
              <div>
                <h4 className={styles.instructions}>
                  Select intents you would like to include by clicking once.
                </h4>
                <h4 className={styles.instructions1}>
                  Choose a specific path by clicking again and selecting next.
                </h4>
              </div>
            </>
          )}
        </div>

        <div className={styles.buttonContainer}>
          <GenericButton
            buttonType={
              Object.values(intentState).some((x) => x === 2)
                ? "blue"
                : "disabled"
            }
            text={"Continue"}
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
