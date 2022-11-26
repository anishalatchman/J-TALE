import React from "react";
import styles from "./landing.module.css";
import GenericButton from "../../Components/Buttons/GenericButton";
import { useNavigate } from "react-router-dom";

function Landing() {
  const Navigate = useNavigate();
  const PageChange = (url) => {
    Navigate(url);
  };

  return (
    <div className="container">
      <h1 className={`h1 ${styles.title}`}>
        Transcript to chatbot <br /> with a couple clicks
      </h1>
      <h4 className={styles.subtitle}>A flow-building plugin for Voiceflow</h4>
      <div className={styles.buttonContainer}>
        <GenericButton
          buttonType="blue"
          onClick={() => {
            PageChange("/upload");
          }}
          disabled={false}
          text={"Upload Transcript"}
        />
        <GenericButton
          buttonType="outline"
          onClick={() => {
            PageChange("/recover");
          }}
          disabled={false}
          text={"Recover Session"}
        />
      </div>
    </div>
  );
}
export default Landing;
