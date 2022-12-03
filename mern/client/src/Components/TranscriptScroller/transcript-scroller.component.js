import React, { useContext } from "react";
import GenericButton from "../Buttons/GenericButton";
import styles from "./transcript-scroller.component.module.css";
import { ScrollerContext } from "../../Contexts/scrollerProvider";
import GetFlowData from "../../utils/export";
import { QuestionContext } from "../../Contexts/questionProvider";

export default function Scrollbar() {
  const [, , , , allQuestions, , , ,] = useContext(QuestionContext);

  const downloadFile = () => {
    // Gets the flow data as a list of JSON object of QA pairs

    console.log(allQuestions);
    const myData = GetFlowData(allQuestions);
    console.log(myData);

    // create file in browser
    const fileName = "flow_data";
    const json = JSON.stringify(myData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    // create "a" HTLM element with href to file
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  const [speechList] = useContext(ScrollerContext);
  return (
    <div className={styles.scroller}>
      <div className={styles.transcriptContainer}>
        <div className={styles.transcriptHeader}>
          <h1 className={styles.scrollerTitle}>Transcript</h1>
        </div>
        {speechList.length === 0 ? (
          <></>
        ) : (
          <div className={styles.transcriptText}>
            {speechList.map((speech) => {
              return (
                <p key={speech.text} className={styles.bolded}>
                  {speech.source + " " + speech.text}{" "}
                </p>
              );
            })}

            <p className="indent">3 intents available</p>
            <br></br>
          </div>
        )}
      </div>
      <div className={styles.buttonContainer}>
        <GenericButton
          buttonType="white"
          onClick={() => downloadFile()}
          disabled={false}
          text={"Export Transcript"}
        />
      </div>
    </div>
  );
}
