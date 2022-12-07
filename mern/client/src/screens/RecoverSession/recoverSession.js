import React, { useState, useContext, useEffect } from "react";
import styles from "./recoverSession.module.css";
import GenericButton from "../../Components/Buttons/GenericButton";
import { SessionContext } from "../../Contexts/sessionProvider";
import { qaContext } from "../../Contexts/qaProvider";
import { useNavigate } from "react-router-dom";
import { recoverFlow } from "../../Controller/flowController";
import { recoverStartingQA } from "../../Controller/QAController";
import { FlowContext } from "../../Contexts/flowProvider";
import { QuestionContext } from "../../Contexts/questionProvider";
import { SpeakerContext } from "../../Contexts/speakerProvider";
import { ScrollerContext } from "../../Contexts/scrollerProvider";
import uploadFileController from "../../utils/Controller/uploadFileController";

export default function RecoverSession() {
  const Navigate = useNavigate();
  const [, setSessionID, , setTranscriptID] = useContext(SessionContext);
  const [, setCurrQA] = useContext(qaContext);
  const [inputText, setInputText] = useState("");
  const [showError, setShowError] = useState(false);
  const [, setSpeechList] = useContext(ScrollerContext);
  // CONTEXTS TO IMPLEMENT FROM STARTING-INTENT
  const [, setFlowState, , setFlowStartingQuestions, , setFlowAllQuestions] =
    useContext(FlowContext);
  const [
    ,
    setIsFirstQuestion,
    nextQuestions,
    setNextQuestions,
    ,
    setAllQuestions,
    prevPrompt,
    setPrevPrompt,
  ] = useContext(QuestionContext);
  const uploadFile = new uploadFileController();
  const [, setSpeaker, , setPrevSpeaker, , setIsIntents] =
    useContext(SpeakerContext);

  // FUNCTIONS BELOW
  const PageChange = (url) => {
    Navigate(url);
  };

  useEffect(() => {
    if (
      nextQuestions?.length !== 0 &&
      prevPrompt !== "This is the start of your flow."
    ) {
    }
  }, [nextQuestions, prevPrompt]);

  const handleSubmit = async (event) => {
    // prevent page reload
    event.preventDefault();
    // set sessionid before loading starting-intent page
    const flow = await recoverFlow(inputText);
    const startingQA = await setFlowVars(flow);
    const questionsObj = {
      next: await getQAs(flow.questions),
      all: await getQAs(flow.allQuestions),
    };
    LoadSession(startingQA, flow, questionsObj);
  };

  // recovers flow from DB and sets current_qa context state
  const LoadSession = (startingQA, flow, questionsObj) => {
    if (flow) {
      setShowError(false);
      // console.log("Starting QA: ", startingQA);
      setNextQuestions(questionsObj.next);
      setAllQuestions(questionsObj.all);

      setCurrQA(startingQA);
      // flowContext is question ID's, questionContext is json objects

      setIsIntents(true);
      setSpeaker("Bot:");
      setPrevSpeaker("User:");
      // console.log(flow.speechList, "SPEECH LISt");
      // console.log(speechList, "SPEECH LIST 2");

      // Show User: and Bot: labels if not on first question
      if (flow.current_question !== "") {
        setIsFirstQuestion(false);
        setPrevPrompt(startingQA.question);
      }
      PageChange("/startingintent");
    } else {
      setShowError(true);
    }
  };

  const setFlowVars = (flow) => {
    const startingQA = recoverStartingQA(flow);
    // SET VARS FOR STARTING-INTENT
    setSessionID(inputText);
    setFlowStartingQuestions(flow.questions);
    setFlowAllQuestions(flow.allQuestions);
    setTranscriptID(flow.transcriptID);
    setFlowState(flow);
    //Pops the last intent from the scroller if it is there
    if (flow.speechList[flow.speechList.length - 1]?.source === "User:") {
      flow.speechList.pop();
    }
    setSpeechList(flow.speechList);
    return startingQA;
  };

  const handleChange = (event) => {
    // set sessionID to input text
    setInputText(event.target.value);
  };

  const getQAs = async (idList) => {
    return uploadFile.getQAList(idList);
  };

  return (
    <div className="container">
      <h1 className={styles.pageTitle}>Recover Session</h1>
      {showError ? (
        <h2 className={styles.errorLabel}>
          Invalid Session ID. Please try again.
        </h2>
      ) : (
        <></>
      )}
      <form className={styles.inputForm} onSubmit={handleSubmit}>
        <label className={styles.label}>Input Session ID</label>
        <input
          className={styles.inputContainer}
          id="inputField"
          type="text"
          value={inputText}
          onChange={handleChange}
          placeholder="Session ID"
        />
        <GenericButton
          buttonType="white"
          onClick={() => handleSubmit}
          disabled={false}
          text={"Begin Session"}
        />
      </form>
      <div className={styles.buttonContainer}>
        <GenericButton
          buttonType="outline"
          onClick={() => {
            PageChange("/");
            // clear input field and sessionID
            setInputText("");
            setSessionID();
          }}
          disabled={false}
          text={"Go Back"}
        />
      </div>
    </div>
  );
}
