import React, { useState, useContext } from "react";
import styles from "./recoverSession.module.css";
import GenericButton from "../../Components/Buttons/GenericButton";
import { SessionContext } from "../../Contexts/sessionProvider";
import { useNavigate } from "react-router-dom";

export default function RecoverSession() {
  const Navigate = useNavigate();
  const [sessionID, setSessionID, , ] = useContext(SessionContext);

  const PageChange = (url) => {
    Navigate(url);
  };

  const handleSubmit = (event) => {
    // prevent page reload
    event.preventDefault();
    // show navbar buttons for starting-intent page
    setSessionID(true);
    PageChange("/startingintent")
    }

  const handleChange = (event) => {
    // set sessionID to input text
    setSessionID(event.target.value);
  };

  return (
    <div className="container">
      <h1 className={styles.pageTitle}>Recover Session</h1>
      <form className={styles.inputForm} onSubmit={handleSubmit}>
        <label className={styles.label}>Input Session ID</label>
        <input
          className={styles.inputContainer}
          id="inputField"
          type="text"
          value={sessionID}
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
            setSessionID(false);
            // clear input field and sessionID
            setSessionID()
          }}
          disabled={false}
          text={"Go Back"}
        />
      </div>
    </div>
  );
}
