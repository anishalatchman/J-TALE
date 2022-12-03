import React, { useContext } from "react";
import GenericButton from "../Buttons/GenericButton";
import styles from "./transcript-scroller.component.module.css";
import { ScrollerContext } from "../../Contexts/scrollerProvider";

export default function Scrollbar() {
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
          onClick={() => null}
          disabled={false}
          text={"Export Transcript"}
        />
      </div>
    </div>
  );
}
