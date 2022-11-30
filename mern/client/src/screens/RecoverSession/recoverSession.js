import React, { useState, useContext } from "react";
import styles from "./recoverSession.module.css";
import GenericButton from "../../Components/Buttons/GenericButton";
import { SessionContext } from "../../Contexts/sessionProvider";
import { qaContext } from "../../Contexts/qaProvider";
import { useNavigate } from "react-router-dom";
import { recoverFlow } from "../../Controller/flowController"
import { recoverStartingQA } from "../../Controller/QAController"

export default function RecoverSession() {
  const Navigate = useNavigate();
  const [, setSessionID, , ] = useContext(SessionContext);
  const [, setCurrQA] = useContext(qaContext);
  const [inputText, setInputText] = useState("")
  const [showError, setShowError] = useState(false)

  const PageChange = (url) => {
    Navigate(url);
  };

  const handleSubmit = async (event) => {
    // prevent page reload
    event.preventDefault();
    // set sessionid before loading starting-intent page 
    LoadSession();
    }
    
  // recovers flow from DB and sets current_qa context state
  const LoadSession = async () => {
    const flow = await recoverFlow(inputText);
    if (flow) {
      setShowError(false)
      const startingQA = await recoverStartingQA(flow);
      setSessionID(inputText);
      setCurrQA(startingQA)
      PageChange("/startingintent")
     }
    else {
      setShowError(true)
    }
  };

  const handleChange = (event) => {
    // set sessionID to input text
    setInputText(event.target.value);
  };

  return (
    <div className="container">
      <h1 className={styles.pageTitle}>Recover Session</h1>
      {showError ? (
        <h2 className={styles.errorLabel}>Invalid Session ID. Please try again.</h2>
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
