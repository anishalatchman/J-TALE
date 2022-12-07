import React, { useContext, useState } from "react";
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
        setShowAlertSaveFail(true);
        setTimeout(() => {
          setShowAlertSaveFail(false);
        }, 3000);
        // handleSaveError();
        return;
      } else {
        // alert("Saved Successfully");
        setShowAlertSaveSuccess(true);
        setTimeout(() => {
          setShowAlertSaveSuccess(false);
        }, 3000);
        // handleSaveSuccess();
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
        // handleDeleteError();
        setShowAlertDeleteFail(true);
        setTimeout(() => {
          setShowAlertDeleteFail(false);
        }, 3000);
      } else {
        // alert("Successfully Deleted");
        setShowModalDelete(false);
        setShowAlertDeleteSuccess(true);
        setTimeout(() => {
          setShowAlertDeleteSuccess(false);
        }, 3000);
        // handleDeleteSuccess();
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
    <div>
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
        alert="Your work will be gone forever!"
        onClose={() => {
          setShowModalDelete(false);
        }}
        onSubmit={() => {
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
