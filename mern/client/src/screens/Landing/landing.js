import React, { Component } from "react";
import axios from "axios";
import "./landing.css";
import GenericButton from "../../Components/Buttons/GenericButton";
export default class Landing extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="h1 title">
          Transcript to chatbot <br /> with a couple clicks
        </h1>
        <h4 className="subtitle">A flow-building plugin for Voiceflow</h4>
        <div className="buttonContainer">
          <GenericButton
            buttonType="blue"
            onClick={() => null}
            disabled={false}
            text={"Upload Transcript"}
          />
          <GenericButton
            buttonType="outline"
            onClick={() => null}
            disabled={false}
            text={"Recover Session"}
          />
        </div>
      </div>
    );
  }
}
