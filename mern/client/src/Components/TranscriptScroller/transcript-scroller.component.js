import React, { Component } from "react";
import GenericButton from "../Buttons/GenericButton";
import "./transcript-scroller.component.css";

export default class Scrollbar extends Component {
  render() {
    return (
      <div className="scroller">
        <div className="transcriptHeader">
          <h1 className="scrollerTitle">Transcript</h1>
          <GenericButton
            buttonType="white"
            // class="btn-bot"
            onClick={() => null}
            disabled={false}
            text={"Export Transcript"}
          />
        </div >

        <div className="transcriptText">
        <p>This is where the text of the transcript will be </p>
        <p>Bot: What can I help you with today?</p>

        <br></br>

        <p>
          Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum{" "}
        </p>
        <p>
          Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum{" "}
        </p>
        <p>
          Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum{" "}
        </p>
        <p>
          Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum{" "}
        </p>
        <p>
          Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum{" "}
        </p>
        <p>
          Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum{" "}
        </p>
        <p>
          Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum{" "}
        </p>
        <p>
          Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum{" "}
        </p>
        <p>
          Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum{" "}
        </p>
        <p>
          Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum{" "}
        </p>
        <p>
          Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum{" "}
        </p>
        <p>
          Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum{" "}
        </p>
        <p>
          Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum{" "}
        </p>
        </div>

      </div>
    );
  }
}
