import React, { useState, useContext } from "react";
import styles from "./recoverSession.module.css";
import GenericButton from "../../Components/Buttons/GenericButton";
import { SessionContext } from "../../Contexts/sessionProvider";
import { useNavigate } from "react-router-dom";

export default function RecoverSession() {
  const Navigate = useNavigate();
  const [, setSessionID, , ] = useContext(SessionContext);
  const [inputText, setInputText] = useState("")

  const PageChange = (url) => {
    Navigate(url);
  };

  const handleSubmit = (event) => {
    // prevent page reload
    event.preventDefault();
    // show navbar buttons for starting-intent page
    setSessionID(inputText);
    PageChange("/startingintent")
    }

  const handleChange = (event) => {
    // set sessionID to input text
    setInputText(event.target.value);
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
