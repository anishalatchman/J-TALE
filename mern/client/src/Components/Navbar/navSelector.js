import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import GenericButton from "../Buttons/GenericButton";

export default function NavSelector({pageid}) {
  // React state to manage visibility
  const [show, setShow] = useState();

  // function to toggle the boolean value
  function toggleShow() {
    setShow(!show);
  }
  var buttonText = show ? "Hide Component" : "Show Component";

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
      <div className="flex items-center">
        <h2 className="font-nunito font-medium">
          SESSION ID: {sessionid}  
          {/* NEED TO PASS IN SESSION ID VARIABLE HERE */}
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
    </nav>
  );
}
