import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import GenericButton from "../Buttons/GenericButton";
import { SessionContext } from "../../Contexts/sessionProvider";
import { qaContext } from "../../Contexts/qaProvider";
import { FlowContext } from "../../Contexts/flow.Provider";
import { deleteFlow } from "../../utils/delete";
import { saveFlow, saveQA } from "../../utils/save";

export default function Navbar() {
  // define context var to show/hide nav buttons
  const [sessionID, setSessionID] = useContext(SessionContext);
  const [currQA] = useContext(qaContext);
  const [currFlow, , , , ,] = useContext(FlowContext);

  // Create session id var and setter function
  // const sessionid = "12345";
  // const setSessionID = (id) => {
  //   sessionid = id;
  // };
  const Navigate = useNavigate();
  const PageChange = (url) => {
    Navigate(url);
  };

  // This function is called when user clicks save button and saves the current question
  const trySave = (currFlow, currQA, sessionID) => {
    if (!saveQA(currFlow, currQA, sessionID)) {
      alert("Unable to save the current page");
    } else if (!saveFlow(currQA, sessionID)) {
      alert("Save FAILED");
    } else {
      alert("Saved Successfully");
    }
  };

  // This function is called when user clicks deletes and deletes the flow
  const tryDelete = (currFlow, sessionID) => {
    deleteFlow(currFlow, sessionID).then((res) => {
      if (!res) {
        alert("Unable to Delete");
      } else {
        alert("Successfully Deleted");
      }
    });
    setSessionID(null);
    PageChange("/");
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
