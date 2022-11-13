import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export default class Navbar extends Component {
  render() {
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
      </nav>
    );
  }
}
