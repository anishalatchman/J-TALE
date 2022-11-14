import React, { Component, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import GenericButton from "../Buttons/GenericButton";
import NavStateContext from "./navState";


export default function NavbarButtons() {
  // define context var to show/hide nav buttons
  const [navState, setNavState] = useContext(NavStateContext)
  // const showButtons = true;
  
  // Create session id var and setter function
  const sessionid = "12345";
  const setSessionID = (id) => {
    sessionid = id;
  };

  return (
    <nav className="navbar-bg">
      <Link to="/" className="nav-link">
        <div className="navbar-links">
          <img
            src={require("../../assets/voiceflow.png")}
            alt={"voiceflow"}
            className="nav-icon"
          />
          | J TALE
        </div>
      </Link>

      {/* Conditionally show buttons div based on showButtons */}
      {navState &&
      <div className="flex items-center">
        <h2 className="font-nunito font-medium">
          SESSION ID: {sessionid}  
        </h2>
        <GenericButton
        buttonType="nav"
        onClick={() => null}
        disabled={false}
        text={"SAVE"}
      />
        <GenericButton
        buttonType="nav"
        onClick={() => null}
        disabled={false}
        text={"DELETE SESSION"}
      />
      </div>
      }
    </nav>
  );
}
