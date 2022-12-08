import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import Modal from "../Modals/GenericModal";
import Alert from "../Alerts/GenericAlert";

export default function Navbar() {
  // define context var to show/hide nav buttons
  const [currQA, setcurrQAState] = useContext(qaContext);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showAlertDeleteSuccess, setShowAlertDeleteSuccess] = useState(false);
  const [showAlertDeleteFail, setShowAlertDeleteFail] = useState(false);
  const [showAlertSaveFail, setShowAlertSaveFail] = useState(false);
  const [showAlertSaveSuccess, setShowAlertSaveSuccess] = useState(false);
  const [showDeleteLoad, setShowDeleteLoad] = useState(false);
  const [
    currFlow,
    setFlowState,
    ,
    setFlowStartingQuestions,
    ,
    setFlowAllQuestions,
  ] = useContext(FlowContext);
  const [intentState, setIntentState] = useContext(IntentContext);
  const [, setSpeaker, , setPrevSpeaker, , setIsIntents] =
    useContext(SpeakerContext);
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
  const [, setSpeechList] = useContext(ScrollerContext);
  const [sessionID, setSessionID, , setTranscriptID] =
    useContext(SessionContext);

  const Navigate = useNavigate();
  const PageChange = (url) => {
    Navigate(url);
  };

  // This function is called when user clicks save button and saves the current question
  const trySave = (currFlow, currQA, sessionID) => {
    console.log(currFlow.speechList, "SAVING SPEECH LIST");
    const saveSession = new saveSessionController();
    saveSession.saveFlow(currFlow, currQA, sessionID).then((res) => {
      if (!res) {
        setShowAlertSaveFail(true);
        setTimeout(() => {
          setShowAlertSaveFail(false);
        }, 1000);
        return;
      } else {
        PageChange("/save");
        setShowAlertSaveSuccess(true);
        setTimeout(() => {
          setShowAlertSaveSuccess(false);
        }, 1000);
        // Disables continue button by resets intentState values to 0
        Object.keys(intentState).forEach((key) => {
          intentState[key] = 0;
        });
      }
    });
  };

  // This function is called when user clicks deletes and deletes the flow
  const tryDelete = async (currFlow, sessionID) => {
    const deleteFlow = new deleteController();
    await deleteFlow.deleteFlow(currFlow, sessionID).then((res) => {
      if (!res) {
        setShowModalDelete(false);
        setShowAlertDeleteFail(true);
        setTimeout(() => {
          setShowAlertDeleteFail(false);
        }, 1000);
      } else {
        setShowModalDelete(false);
        setShowAlertDeleteSuccess(true);
        setShowDeleteLoad(false);
        setTimeout(() => {
          setShowAlertDeleteSuccess(false);
        }, 1000);

        // Disables continue button by resets intentState values to 0
        Object.keys(intentState).forEach((key) => {
          intentState[key] = 0;
        });
      }
    });
    PageChange("/");
    // Resets all contexts to original value\
    resetContext();
  };

  const resetContext = () => {
    setSessionID(null);
    setcurrQAState({});
    setFlowState({});
    setFlowStartingQuestions([]);
    setFlowAllQuestions([]);
    setSpeaker("User:");
    setPrevSpeaker("Bot:");
    setIsFirstQuestion(true);
    setNextQuestions([]);
    setAllQuestions([]);
    setPrevPrompt("This is the start of your flow.");
    setSpeechList([]);
    setTranscriptID(null);
    setIntentState({});
    setIsIntents(false);
  };

  return (
    <div>
      <nav className={styles.navbarBG}>
        <div className={styles.navbarLinks}>
          <img
            src={require("../../assets/voiceflow.png")}
            alt={"voiceflow"}
            className={styles.navIcon}
          />
          | J TALE
        </div>

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
              text={"SAVE SESSION"}
            />
            <GenericButton
              buttonType="nav"
              // onClick={() => tryDelete(currFlow, sessionID)}
              onClick={() => setShowModalDelete(true)}
              disabled={false}
              text={"DELETE SESSION"}
            />
          </div>
        )}
      </nav>
      <Modal
        show={showModalDelete}
        title="Delete Your Session?"
        valid={false}
        buttons={showDeleteLoad}
        alert={
          showDeleteLoad
            ? "Deleting your session..."
            : "All your progress will be deleted!"
        }
        onClose={() => {
          setShowModalDelete(false);
          setShowDeleteLoad(false);
        }}
        onSubmit={() => {
          setShowDeleteLoad(true);
          tryDelete(currFlow, sessionID);
        }}
      />
      <Alert
        show={showAlertSaveSuccess}
        success={true}
        message="Successfully Saved!"
      />
      <Alert
        show={showAlertSaveFail}
        success={false}
        message="Unable to Save"
      />
      <Alert
        show={showAlertDeleteSuccess}
        success={true}
        message="Successfully Deleted!"
      />
      <Alert
        show={showAlertDeleteFail}
        success={false}
        message="Unable to Delete"
      />
    </div>
  );
}
