import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import GenericButton from "../Buttons/GenericButton";
import { SessionContext } from "../../Contexts/sessionProvider";


export default function Navbar() {
  // define context var to show/hide nav buttons
  const [sessionID, setSessionID, , ] = useContext(SessionContext)

  return (
    <nav className="navbar-bg">
      <Link to="/" className="nav-link" onClick={() => {
        // reset sessionID on return to home page
        setSessionID()
      }}>
        <div className="navbar-links">
          <img
            src={require("../../assets/voiceflow.png")}
            alt={"voiceflow"}
            className="nav-icon"
          />
          | J TALE
        </div>
      </Link>

      {/* Conditionally show buttons div based on sessionID */}
      {sessionID &&
      <div className="flex items-center">
        <h2 className="font-nunito font-medium justify-center">
          SESSION ID: {sessionID}  
        </h2>
        <GenericButton
        buttonType="nav"
        onClick={() => null}
        disabled={false}
        text={"SAVE SESSION"}
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
