import React, { useContext, useState } from "react";
import styles from "./StartingIntent.module.css";
import "./../../Components/Buttons/ButtonStyleSheet.css";
import GenericButton from "../../Components/Buttons/GenericButton";
import IntentButtons from "../../Components/IntentButtons/IntentButtons";
import Scrollbar from "../../Components/TranscriptScroller/transcript-scroller.component";
import { SpeakerContext } from "../../Contexts/speakerProvider";
import { IntentContext } from "../../Contexts/intentsProvider";
import { qaContext } from "../../Contexts/qaProvider";
import { QuestionContext } from "../../Contexts/questionProvider";
import { ScrollerContext } from "../../Contexts/scrollerProvider";

function StartingIntent() {
  const [currQA] = useContext(qaContext);
  const [currSpeaker, setSpeaker, prevSpeaker, setPrevSpeaker] =
    useContext(SpeakerContext);
  const [intentState] = useContext(IntentContext);
  const [currQuestion, setCurrQuestion] = useState();
  const [
    ,
    ,
    nextQuestions,
    setNextQuestions,
    allQuestions,
    ,
    prevPrompt,
    setPrevPrompt,
  ] = useContext(QuestionContext);
  const [speechList, setSpeechList] = useContext(ScrollerContext);

  //Boolean for whether intents are being selected
  const [isIntents, setIsIntents] = useState(false);

  //Changes the states and identifiers of who's speech is being selected
  const handleSpeakerChange = () => {
    const prev = prevSpeaker;
    const curr = currSpeaker;
    setPrevSpeaker(curr);
    setSpeaker(prev);
    setIsIntents(!isIntents);
  };

  const handleQAChange = () => {
    //Speech is used as an identifier for selected question/intent
    const speech = getSpeech();

    // Identify whether we are on a questions or intents
    // If questions -> Update current QA context with seelcted QA.

    // This if statement differentiates between whether we are choosing questions or intents
    // If !buttons, we are choosing questions and if buttons we are choosing intents
    if (isIntents) {
      // Change the intent_included to be true for all selected intents
      // Then make call to DB

      const intent = currQuestion.intents.find((x) => x.value === speech);
      const lst = findNextQuestions(intent);
      setNextQuestions(lst);
      setSpeechList([
        ...speechList,
        {
          source: prevSpeaker,
          text: speech,
          question: intent,
          optionsLength: currQuestion.intents.length,
        },
      ]);
    } else {
      // First find the QA object for list allQuestions
      // Should be changing currQA and then change the question_included value to be true
      // Then make an call to DB to update
      const nextQA = nextQuestions.find((x) => x.question === speech);
      setCurrQuestion(nextQA); //Setting current question object
      setSpeechList([
        ...speechList,
        {
          source: prevSpeaker,
          text: speech,
          question: nextQA,
          optionsLength: nextQuestions.length,
        },
      ]);
    }

    // Disables continue button by resets intentState values to 0
    Object.keys(intentState).forEach((key) => {
      intentState[key] = 0;
    });
  };

  //Find the list of next questions, depending on the selected intent
  const findNextQuestions = (intent) => {
    const lst = [];
    allQuestions.forEach((x) => {
      if (intent.children.includes(x.id)) {
        lst.push(x);
      }
    });
    return lst;
  };

  //Gets the speech of the selected button
  const getSpeech = () => {
    const speech = Object.keys(intentState).find((x) => intentState[x] === 2);
    setPrevPrompt(speech);
    return speech;
  };

  return (
    <div className="container">
      <div className={styles.scroller}>
        <Scrollbar />
      </div>
      <div className={styles.intentContainer}>
        <h4 className={styles.speaker1}>{prevSpeaker}</h4>
        {console.log("this should be the strating q", currQA.question)}
        <h1 className={styles.intentTitle}>{currQA.question}</h1>
        {/* <h1 className={styles.intentTitle}>{prevPrompt}</h1> */}

        <h4 className={styles.speaker2}>{currSpeaker}</h4>

        <div>
          {nextQuestions.length === 0 || currQuestion?.intents?.length === 0 ? (
            <>
              <h3 className={currQA.styles.completed}>
                Your flow has been completed! Click the transcripts to jump back.
              </h3>
            </>
          ) : (
            <>
              <h4 className={styles.speaker2}>{currSpeaker}</h4>

              <IntentButtons
                intents={isIntents ? currQuestion.intents : nextQuestions}
                user={isIntents}
              />
              <div>
                <h4 className={styles.instructions}>
                  Select intents you would like to include by{" "}
                  <strong>clicking once</strong>.
                </h4>
                <h4 className={styles.instructions1}>
                  Choose a specific path by <strong>clicking again</strong> and
                  selecting next.
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
              // console.log("here's intent state", intentState)
              // const clickedBttn = Object.keys(intentState).find(key => intentState[key] === 2);
              // const intentObj = currQA.intents.find((x) => x.value === clickedBttn);
              // setCurrQA(currQA.intents[clickedBttn])
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default StartingIntent;
