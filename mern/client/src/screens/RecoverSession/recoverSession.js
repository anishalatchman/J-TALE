import React, { useState, useContext } from "react";
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
import uploadFileController from "../../utils/Controller/uploadFileController";

export default function RecoverSession() {
  const Navigate = useNavigate();
  const [, setSessionID, , setTranscriptID] = useContext(SessionContext);
  const [currQA, setCurrQA] = useContext(qaContext);
  const [inputText, setInputText] = useState("");
  const [showError, setShowError] = useState(false);

  // CONTEXTS TO IMPLEMENT FROM STARTING-INTENT
  const [
    ,
    setFlowState,
    flowStartingQuestions,
    setFlowStartingQuestions,
    flowAllQuestions,
    setFlowAllQuestions,
  ] = useContext(FlowContext);
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
    LoadSession();
  };

  // recovers flow from DB and sets current_qa context state
  const LoadSession = async () => {
    const flow = await recoverFlow(inputText);
    if (flow) {
      setShowError(false);
      const startingQA = await recoverStartingQA(flow);

      // SET VARS FOR STARTING-INTENT
      setSessionID(inputText);
      await setCurrQA(startingQA);
      setTranscriptID(flow.transcriptID);
      setFlowState(flow);
      setIsIntents(true);
      setSpeaker("User:");
      setPrevSpeaker("Bot:");
      await setFlowStartingQuestions(flow.questions);
      await setNextQuestions(getQAs(flowStartingQuestions));
      await setAllQuestions(getQAs(flowAllQuestions));
      // flowContext is question ID's, questionContext is json objects
      setFlowAllQuestions(flow.allQuestions);
      setAllQuestions(flow.allQuestions);

      // Show User: and Bot: labels if not on first question
      if (flow.current_question !== "") {
        setIsFirstQuestion(false);
        setPrevPrompt(currQA.question);
      }

      PageChange("/startingintent");
    } else {
      setShowError(true);
    }
  };

  const handleChange = (event) => {
    // set sessionID to input text
    setInputText(event.target.value);
  };

  const getQAs = (idList) => {
    // converts list of QA ids to QA objects
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
