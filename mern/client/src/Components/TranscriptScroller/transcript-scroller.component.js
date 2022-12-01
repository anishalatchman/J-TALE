import React, { useContext } from "react";
import GenericButton from "../Buttons/GenericButton";
import "./transcript-scroller.component.css";
import { ScrollerContext } from "../../Contexts/scrollerProvider";

export default function Scrollbar(props) {
  const [speechList] = useContext(ScrollerContext);
  return (
    <div className="scroller">
      <div className="transcriptContainer">
        <div className="transcriptHeader">
          <h1 className="scrollerTitle">Transcript</h1>
        </div>
        {speechList.length === 0 ? (
          <></>
        ) : (
          <div className="transcriptText">
            {speechList.map((speech) => {
              return (
                <p key={speech.text} className="bolded">
                  {speech.source + " " + speech.text}{" "}
                </p>
              );
            })}

            <p className="indent">3 intents available</p>
            <br></br>
          </div>
        )}
      </div>
      <div className="buttonContainer">
        <GenericButton
          buttonType="white"
          onClick={() => null}
          disabled={false}
          text={"Export Transcript"}
        />
      </div>
    </div>
  );
}
