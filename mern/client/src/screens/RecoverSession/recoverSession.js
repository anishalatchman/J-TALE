import React, { useState, useContext } from "react";
import "./recoverSession.css";
import GenericButton from "../../Components/Buttons/GenericButton";
import { SessionContext } from "../../Contexts/sessionProvider";
import { useNavigate } from "react-router-dom";

export default function RecoverSession() {
  const Navigate = useNavigate();
  const [, setNavState, sessionid, setSessionID] = useContext(SessionContext);

  const PageChange = (url) => {
  Navigate(url);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // show navbar buttons for starting-intent page
    setNavState(true) 
    alert(`The session ID you entered was: ${sessionid}`)
  }

  const handleChange = (event) => {
    // set sessionid to input text
    setSessionID(event.target.value);
  }

    return (
      <div className="container">
        <h1 className="pageTitle">Recover Session</h1>
        <form className="inputForm w-1/3 mx-auto" onSubmit={handleSubmit}>
          <label className="text-xl text-white font-nunito font-medium">
            Input Session ID
          </label>
          <input
            className="m-6 w-3/4 pl-4 pr-2 pt-2 pb-2 block rounded-full text-black"
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
        <div className="buttonContainer">
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
