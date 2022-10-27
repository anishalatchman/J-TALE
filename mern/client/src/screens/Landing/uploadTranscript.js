import React, { Component } from "react";
import "./uploadTranscript.css";
import "./../../Components/Buttons/ButtonStyleSheet.css"
import GenericButton from "../../Components/Buttons/GenericButton";
import Scrollbar from "../../Components/transcript-scroller.component";
import scroller from "../../Components/transcript-scroller.component.css"


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
        <GenericButton
            buttonType="outline"
            onClick={() => null}
            disabled={false}
            text={"Upload Transcript"}
          />
          <GenericButton
            buttonType="outline"
            onClick={() => null}
            disabled={false}
            text={"Begin Session"}
          />
        </div>
        <div class="scroller">
          <Scrollbar/>
        </div>
      </div>
    );
  }
}