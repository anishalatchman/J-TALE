import React, { useContext } from "react";
import styles from "./StartingIntent.module.css";
import "./../../Components/Buttons/ButtonStyleSheet.css";
import GenericButton from "../../Components/Buttons/GenericButton";
import IntentButtons from "../../Components/IntentButtons/IntentButtons";
import Scrollbar from "../../Components/TranscriptScroller/transcript-scroller.component";
import { qaContext } from "../../Contexts/qaProvider";
import { SpeakerContext } from "../../Contexts/speakerProvider";
import { IntentContext } from "../../Contexts/intentsProvider";
import { QuestionContext } from "../../Contexts/questionProvider";
import { ScrollerContext } from "../../Contexts/scrollerProvider";
import selectIntentController from "../../utils/Controller/selectIntentController";
import { FlowContext } from "../../Contexts/flowProvider";

function StartingIntent() {
  // Defining contexts
  const [currFlow, setFlowState, , , ,] = useContext(FlowContext);
  const [currQA, setcurrQAState] = useContext(qaContext);
  const [
    currSpeaker,
    setSpeaker,
    prevSpeaker,
    setPrevSpeaker,
    isIntents,
    setIsIntents,
  ] = useContext(SpeakerContext);
  const [intentState] = useContext(IntentContext);
  const [
    isFirstQuestion,
    setIsFirstQuestion,
    nextQuestions,
    setNextQuestions,
    allQuestions,
    setAllQuestions,
    prevPrompt,
    setPrevPrompt,
  ] = useContext(QuestionContext);
  const [speechList, setSpeechList] = useContext(ScrollerContext);

  // Creating an instance of the QA class
  const selectIntent = new selectIntentController();

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
    console.log(prevSpeaker, "PREV SPEAKe");
    console.log(currSpeaker, "CURRENT SPEAK");

    // This if statement differentiates between whether we are choosing questions or intents
    // If !buttons, we are choosing questions and if buttons we are choosing intents
    if (isIntents) {
      const intent = currQA.intents.find((x) => x.value === speech);
      const lst = findNextQuestions(intent);
      setNextQuestions(lst);
      currFlow.speechList = [
        ...speechList,
        {
          source: prevSpeaker,
          text: speech,
          question: intent,
          optionsLength: currQA.intents.length,
        },
      ];
      setSpeechList(currFlow.speechList);
      setFlowState(JSON.parse(JSON.stringify(currFlow)));

      const temp = [];
      // Goes through all questions and updates the list with the intents of the current question to be true
      allQuestions.forEach((x) => {
        if (x.id === currQA.id) {
          temp.push(currQA);
        } else {
          temp.push(x);
        }
      });
      setAllQuestions(temp);

      // Then make call to DB
      setcurrQAState(currQA);
      selectIntent.updateQA(currQA);
    } else {
      // Finds the QA from list of next questions
      const nextQA = nextQuestions.find((x) => x.question === speech);

      const temp = [];
      // Find the currQuestions in allQuestions and update the question included boolean
      allQuestions.forEach((x) => {
        if (x.id === currQA) {
          temp.push(currQA);
        }
        temp.push(x);
      });
      setAllQuestions(temp);

      setcurrQAState(nextQA); //Setting current question object

      // Makes Call to DB to update QA
      selectIntent.updateQA(nextQA);
      currFlow.speechList = [
        ...speechList,
        {
          source: prevSpeaker,
          text: speech,
          question: nextQA,
          optionsLength: nextQuestions.length,
        },
      ];
      setSpeechList(currFlow.speechList);
      setFlowState(JSON.parse(JSON.stringify(currFlow)));
    }
    // Disables continue button by resets intentState values to 0
    Object.keys(intentState).forEach((key) => {
      intentState[key] = 0;
    });
  };

  const setFlowSpeechList = () => {
    console.log(speechList, "speech list");
    // Sets speech list to currFlow
    currFlow.speechList = speechList;
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
        {nextQuestions.length === 0 || currQA?.intents?.length === 0 ? (
          <>
            <h3 className={styles.intentTitle}>
              This flow has been completed!
            </h3>
            <div className={styles.instructionsContainer}>
              <h4 className={styles.instructions}>
                Click through the transcript to complete another path.
              </h4>
            </div>
          </>
        ) : (
          <>
            {isFirstQuestion ? (
              <>
                <h1 className={styles.intentTitle}>{prevPrompt}</h1>
                <h4 className={styles.speaker2}>{prevSpeaker}</h4>
              </>
            ) : (
              <>
                <h4 className={styles.speaker1}>{prevSpeaker}</h4>
                <h1 className={styles.intentTitle}>{prevPrompt}</h1>
                <h4 className={styles.speaker2}>{currSpeaker}</h4>
              </>
            )}

            <IntentButtons
              intents={isIntents ? currQA.intents : nextQuestions}
              user={isIntents}
            />
            <div className={styles.instructionsContainer}>
              <h4 className={styles.instructions}>
                Select intents you would like to include by{" "}
                <strong>clicking once</strong>.
              </h4>
              <h4 className={styles.instructions}>
                Choose a specific path by <strong>clicking again</strong> and
                selecting continue.
              </h4>
            </div>
          </>
        )}

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
              setFlowSpeechList(); //Separate for state rendering
              // Show User: and Bot: labels
              setIsFirstQuestion(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default StartingIntent;
