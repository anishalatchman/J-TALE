import React, { useState, useContext } from "react";
import styles from "./recoverSession.module.css";
import GenericButton from "../../Components/Buttons/GenericButton";
import { SessionContext } from "../../Contexts/sessionProvider";
import { useNavigate } from "react-router-dom";

export default function RecoverSession() {
  const Navigate = useNavigate();
  const [sessionid, setSessionID] = useState("");
  const [, setNavState] = useContext(SessionContext);

  const PageChange = (url) => {
    Navigate(url);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // show navbar buttons for starting-intent page
    setNavState(true);
    alert(`The session ID you entered was: ${sessionid}`);
  };

  const handleChange = (event) => {
    // set sessionid to input text
    setSessionID(event.target.value);
  };

  return (
    <div className="container">
      <h1 className={styles.pageTitle}>Recover Session</h1>
      <form className={styles.inputForm} onSubmit={handleSubmit}>
        <label className={styles.label}>Input Session ID</label>
        <input
          className={styles.inputContainer}
          type="text"
          value={sessionid}
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
            setNavState(false);
          }}
          disabled={false}
          text={"Go Back"}
        />
      </div>
    </div>
  );
}
