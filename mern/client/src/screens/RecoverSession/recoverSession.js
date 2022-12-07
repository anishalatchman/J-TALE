import React, { useState, useContext } from "react";
import styles from "./recoverSession.module.css";
import GenericButton from "../../Components/Buttons/GenericButton";
import { SessionContext } from "../../Contexts/sessionProvider";
import { qaContext } from "../../Contexts/qaProvider";
import { useNavigate } from "react-router-dom";
import recoverSessionController from "../../utils/Controller/recoverSessionController";
import { FlowContext } from "../../Contexts/flowProvider";
import { QuestionContext } from "../../Contexts/questionProvider";
import { SpeakerContext } from "../../Contexts/speakerProvider";
import { ScrollerContext } from "../../Contexts/scrollerProvider";
import uploadFileController from "../../utils/Controller/uploadFileController";

export default function RecoverSession() {
  const recoverController = new recoverSessionController();
  const Navigate = useNavigate();
  const [, setSessionID, , setTranscriptID] = useContext(SessionContext);
  const [, setCurrQA] = useContext(qaContext);
  const [inputText, setInputText] = useState("");
  // const [showError, setShowError] = useState(false);
  const [infoMsg, setInfoMsg] = useState("");
  const [, setSpeechList] = useContext(ScrollerContext);
  // CONTEXTS TO IMPLEMENT FROM STARTING-INTENT
  const [, setFlowState, , setFlowStartingQuestions, , setFlowAllQuestions] =
    useContext(FlowContext);
  const [
    ,
    setIsFirstQuestion,
    ,
    setNextQuestions,
    ,
    setAllQuestions,
    ,
    setPrevPrompt,
  ] = useContext(QuestionContext);
  const uploadFile = new uploadFileController();
  const [, setSpeaker, , setPrevSpeaker, , setIsIntents] =
    useContext(SpeakerContext);

  // FUNCTIONS BELOW
  const PageChange = (url) => {
    Navigate(url);
  };

  const handleSubmit = async (event) => {
    // prevent page reload
    event.preventDefault();
    // set sessionid before loading starting-intent page

    var flow = false;
    await recoverController.recoverFlow(inputText).then((res) => {
      if (res.status === 200) {
        flow = res.data;
      }
    });

    if (flow) {
      setInfoMsg("Loading your session...");
      const startingQA = await setFlowVars(flow);
      const questionsObj = {
        next: await getQAs(flow.questions),
        all: await getQAs(flow.allQuestions),
      };
      LoadSession(startingQA, flow, questionsObj);
    } else {
      setInfoMsg("Invalid Session ID. Please try again.");
    }
  };

  // recovers flow from DB and sets current_qa context state
  const LoadSession = (startingQA, flow, questionsObj) => {
    setInfoMsg("");
    console.log(startingQA, "STARTINGQA");
    // console.log("Starting QA: ", startingQA);
    setNextQuestions(questionsObj.next);
    setAllQuestions(questionsObj.all);

    setCurrQA(startingQA);
    // flowContext is question ID's, questionContext is json objects

    setIsIntents(true);
    setSpeaker("Bot:");
    setPrevSpeaker("User:");

    // Show User: and Bot: labels if not on first question
    if (flow.current_question !== "") {
      setIsFirstQuestion(false);
      setPrevPrompt(startingQA.question);
    }
    setSessionID(inputText);
    PageChange("/startingintent");
  };

  const setFlowVars = async (flow) => {
    var startingQA;
    await recoverController.recoverStartingQA(flow).then((res) => {
      if (res.status === 200) {
        startingQA = res.data;
      }
    });
    // SET VARS FOR STARTING-INTENT
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
    const res = await uploadFile.getQAList(idList);
    console.log(res);
    return res;
  };

  return (
    <div className="container">
      <h1 className={styles.pageTitle}>Recover Session</h1>
      {infoMsg !== "" ? (
        <h2
          className={
            infoMsg === "Loading your session..."
              ? styles.loadingLabel
              : styles.errorLabel
          }
        >
          {infoMsg}
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
