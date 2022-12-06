import React, { useContext } from "react";
import GenericButton from "../Buttons/GenericButton";
import styles from "./transcript-scroller.component.module.css";
import { ScrollerContext } from "../../Contexts/scrollerProvider";
import exportController from "../../utils/Controller/exportController";
import { QuestionContext } from "../../Contexts/questionProvider";
import { SpeakerContext } from "../../Contexts/speakerProvider";
import { qaContext } from "../../Contexts/qaProvider";
import { FlowContext } from "../../Contexts/flowProvider";

export default function Scrollbar() {
  const [, setSpeaker, , setPrevSpeaker, , setIsIntents] =
    useContext(SpeakerContext);
  const [speechList, setSpeechList] = useContext(ScrollerContext);
  const [, , , setNextQuestions, allQuestions, , , setPrevPrompt] =
    useContext(QuestionContext);
  const [, setcurrQAState] = useContext(qaContext);
  const [, , flowStartingQuestions] = useContext(FlowContext);

  const downloadFile = () => {
    // Gets the flow data as a list of JSON object of QA pairs
    const exportClass = new exportController();
    const myData = exportClass.exportTranscript(allQuestions);
    // create file in browser
    const fileName = "flow_data";
    const json = JSON.stringify(myData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    // create "a" HTLM element with href to file
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  const goBack = (currSpeaker, intents) => {
    poppingList(intents, currSpeaker);
    setIsIntents(currSpeaker === "User:");

    if (currSpeaker === "Bot:") {
      resetQuestion(intents);
    }
    //To reselect an intent
    else {
      setPrevSpeaker("User:");
      setSpeaker("Bot:");
      const q = speechList[speechList.length - 1].question;
      setcurrQAState(q);
      setNextQuestions([1]); // So that intent buttons are loaded when even though no next question list
    }
    //Sets the current speaker to the speaker
    if (speechList.length !== 0) {
      setPrevPrompt(speechList[speechList.length - 1].text);
    }
  };

  //Sets values for properly reselecting questions
  const resetQuestion = (intents) => {
    //If going back to starting questions list
    if (speechList.length === 0) {
      setPrevPrompt("How can I help you today?");
      setNextQuestions(findNextQuestions(intents, true));
      setPrevSpeaker("Bot:");
      setSpeaker("User:");
      return;
    }
    //If selecting any other question, get next question list from previous intent
    else {
      const nextQuestions = findNextQuestions(
        speechList[speechList.length - 1].question,
        false
      );
      setNextQuestions(nextQuestions);
      setPrevSpeaker("Bot:");
      setSpeaker("User:");
    }
  };

  //Find the list of next questions, depending on the selected intent
  const findNextQuestions = (intents, starting) => {
    const lst = [];
    allQuestions.forEach((x) => {
      if (starting) {
        //If we clicked to reselect the first question, it reloads the starting questions
        if (flowStartingQuestions.includes(x.id)) {
          lst.push(x);
        }
      } else {
        //If we're going back to reselect a question it searches the previous intent's children
        if (intents.children && intents.children.includes(x.id)) {
          lst.push(x);
        } else {
          //If we're reselecting an intent it returns the question object
          if (!intents.children) {
            return intents;
          }
        }
      }
    });
    return lst;
  };

  //Pops all values of the list up to and including the value clicked
  const poppingList = (intents) => {
    var i = speechList.length - 1;
    var newSpeechList = speechList; //So not to mutate a React hook
    while (
      newSpeechList[newSpeechList.length - 1].question !== intents &&
      i >= 0
    ) {
      newSpeechList.pop();
      i = i - 1;
    }

    //Pops the prompt that was clicked so the user can reselect it
    newSpeechList.pop();
    setSpeechList([...newSpeechList]);
  };

  return (
    <div className={styles.scroller}>
      <div className={styles.transcriptContainer}>
        <div className={styles.transcriptHeader}>
          <h1 className={styles.scrollerTitle}>Transcript</h1>
        </div>
        {speechList.length === 0 ? (
          <></>
        ) : (
          <div className={styles.transcriptText}>
            {speechList.map((speech) => {
              return (
                <div key={speech.text}>
                  <p
                    className={styles.bolded}
                    onClick={() => goBack(speech.source, speech.question)}
                  >
                    {speech.source + " " + speech.text}{" "}
                  </p>
                  <p className={styles.indent}>
                    {speech.optionsLength} intents available
                  </p>
                </div>
              );
            })}

            <br></br>
          </div>
        )}
      </div>
      <div className={styles.buttonContainer}>
        <GenericButton
          buttonType="white"
          onClick={() => downloadFile()}
          disabled={false}
          text={"Export Transcript"}
        />
      </div>
    </div>
  );
}
