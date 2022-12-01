import React from "react";
import GenericButton from "../Buttons/GenericButton";
import "./transcript-scroller.component.css";

export default function Scrollbar(props) {
  return (
    <div className="scroller">
      <div className="transcriptContainer">
        <div className="transcriptHeader">
          <h1 className="scrollerTitle">Transcript</h1>
        </div>
        <div className="transcriptText">
          <p className="bolded">
            Bot: What kind of pizza do you want to order?
          </p>
          <p className="indent">3 intents available</p>
          <br></br>
        </div>
      </div>
      <div className="buttonContainer">
        <GenericButton
          buttonType="white"
          // class="btn-bot"
          onClick={() => null}
          disabled={false}
          text={"Export Transcript"}
        />
      </div>
    </div>
  );
}
