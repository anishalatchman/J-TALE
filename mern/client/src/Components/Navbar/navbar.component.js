import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import GenericButton from "../Buttons/GenericButton";
import { SessionContext } from "../../Contexts/sessionProvider";
import { qaContext } from "../../Contexts/qaProvider";
import { deleteFlow } from "../../utils/delete";
import { saveFlow } from "../../utils/save";

export default function Navbar() {
  // define context var to show/hide nav buttons
  const [sessionID, setSessionID] = useContext(SessionContext);
  const [currQA] = useContext(qaContext);

  // Create session id var and setter function
  // const sessionid = "12345";
  // const setSessionID = (id) => {
  //   sessionid = id;
  // };

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
            onClick={() => saveFlow(currQA, sessionID)}
            disabled={false}
            text={"SAVE"}
          />
          <GenericButton
            buttonType="nav"
            onClick={() => deleteFlow(sessionID)}
            disabled={false}
            text={"DELETE SESSION"}
          />
        </div>
      )}
    </nav>
  );
}
