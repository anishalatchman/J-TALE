import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import GenericButton from "../Buttons/GenericButton";
import { SessionContext } from "../../Contexts/sessionProvider";
import { qaContext } from "../../Contexts/qaProvider";
import { FlowContext } from "../../Contexts/flowProvider";
import deleteController from "../../utils/Controller/deleteSessionController";
import { IntentContext } from "../../Contexts/intentsProvider";
import saveSessionController from "../../utils/Controller/saveSessionController";
import { QuestionContext } from "../../Contexts/questionProvider";
import { ScrollerContext } from "../../Contexts/scrollerProvider";
import { SpeakerContext } from "../../Contexts/speakerProvider";

export default function Navbar() {
  // define context var to show/hide nav buttons
  const [currQA, setcurrQAState] = useContext(qaContext);
  const [
    currFlow,
    setFlowState,
    ,
    setFlowStartingQuestions,
    ,
    setFlowAllQuestions,
  ] = useContext(FlowContext);
  const [intentState, setIntentState] = useContext(IntentContext);
  const [, setSpeaker, , setPrevSpeaker] = useContext(SpeakerContext);
  const [
    ,
    setQuestionState,
    ,
    setNextQuestions,
    ,
    setAllQuestions,
    ,
    setPrevPrompt,
  ] = useContext(QuestionContext);
  const [, setSpeechList] = useContext(ScrollerContext);
  const [sessionID, setSessionID, , setTranscriptID] =
    useContext(SessionContext);

  const Navigate = useNavigate();
  const PageChange = (url) => {
    Navigate(url);
  };

  // This function is called when user clicks save button and saves the current question
  const trySave = (currFlow, currQA, sessionID) => {
    const saveSession = new saveSessionController();
    saveSession.saveFlow(currFlow, currQA, sessionID).then((res) => {
      if (!res) {
        alert("Unable to Save");
        return;
      } else {
        alert("Saved Successfully");

        PageChange("/save");
        // Disables continue button by resets intentState values to 0
        Object.keys(intentState).forEach((key) => {
          intentState[key] = 0;
        });
      }
    });
  };

  // This function is called when user clicks deletes and deletes the flow
  const tryDelete = (currFlow, sessionID) => {
    const deleteFlow = new deleteController();
    deleteFlow.deleteFlow(currFlow, sessionID).then((res) => {
      if (!res) {
        alert("Unable to Delete");
      } else {
        alert("Successfully Deleted");

        PageChange("/");

        // Resets all contexts to original value\
        resetContext();

        // Disables continue button by resets intentState values to 0
        Object.keys(intentState).forEach((key) => {
          intentState[key] = 0;
        });
      }
    });
  };

  const resetContext = () => {
    setSessionID(null);
    setcurrQAState({});
    setFlowState({});
    setFlowStartingQuestions([]);
    setFlowAllQuestions([]);
    setSpeaker("User:");
    setPrevSpeaker("Bot:");
    setQuestionState([]);
    setNextQuestions([]);
    setAllQuestions([]);
    setPrevPrompt('"How can I help you today?"');
    setSpeechList([]);
    setTranscriptID(null);
    setIntentState({});
  };

  return (
    <nav className={styles.navbarBG}>
      <Link
        to="/"
        className={styles.navLink}
        onClick={() => {
          setSessionID();
        }}
      >
        <div className={styles.navbarLinks}>
          <img
            src={require("../../assets/voiceflow.png")}
            alt={"voiceflow"}
            className={styles.navIcon}
          />
          | J TALE
        </div>
      </Link>

      {/* Conditionally show buttons div based on sessionID existence */}
      {sessionID && (
        <div className="flex items-center">
          <h2 className="font-nunito font-medium flex-grow">
            SESSION ID: {sessionID}
          </h2>
          <GenericButton
            buttonType="nav"
            onClick={() => {
              trySave(currFlow, currQA, sessionID);
            }}
            disabled={false}
            text={"SAVE"}
          />
          <GenericButton
            buttonType="nav"
            onClick={() => tryDelete(currFlow, sessionID)}
            disabled={false}
            text={"DELETE SESSION"}
          />
        </div>
      )}
    </nav>
  );
}
