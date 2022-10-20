import React, { Component } from "react";
import "./uploadTranscript.css";

export default class Landing extends Component {
    
    render() {
    return (
      <div className="container">
        <h1 className="h1 title">
          Upload Transcript
        </h1>
        <div className="buttonContainer">
        <button className="button1">Choose File</button>
        </div>
        <h4 className="subtitle">No file chosen</h4>
        <div className="buttonContainer">
          <button className="button2">Upload Transcript</button>
          <button className="button2">Recover Session</button>
        </div>
      </div>
    );
  }
}