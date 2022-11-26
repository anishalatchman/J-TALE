import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import GenericButton from "../Buttons/GenericButton";
import { SessionContext } from "../../Contexts/sessionProvider";


export default function Navbar() {
  // define context var to show/hide nav buttons
  const [navState, setNavState, sessionid, setSessionID] = useContext(SessionContext)

  return (
    <nav className="navbar-bg">
      <Link to="/" className="nav-link" onClick={() => {
        setNavState(false)
        // reset sessionid on return to home page
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

      {/* Conditionally show buttons div based on navState */}
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
