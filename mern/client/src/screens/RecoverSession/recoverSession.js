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
  const [sessionID, setSessionID, , ] = useContext(SessionContext);
  const [currQA, setCurrQA] = useContext(qaContext);
  const [inputText, setInputText] = useState("")

  const PageChange = (url) => {
    Navigate(url);
  };

  const handleSubmit = async (event) => {
    // prevent page reload
    event.preventDefault();
    // set sessionid before loading starting-intent page 
    setSessionID(inputText);
    PageChange("/startingintent")
    LoadSession();
    }
    
  // This function only needs to run for Recover Session, need a different one for Begin Session
  const LoadSession = async () => {
    const flow = await recoverFlow(inputText);
    const startingQA = await recoverStartingQA(flow);
    setCurrQA(startingQA)
    console.log("This is the curr_qa json object: ", startingQA);
  };

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
