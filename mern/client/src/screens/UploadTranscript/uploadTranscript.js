import React from "react";
import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./uploadTranscript.module.css";
import GenericButton from "../../Components/Buttons/GenericButton";
import Modal from "../../Components/Modals/GenericModal";
import { transcriptJSONConverter, deleteFile } from "../../utils/transcript";
import { flowUploader } from "../../utils/startScreen";
import { SessionContext } from "../../Contexts/sessionProvider";

function UploadTranscript() {
  const Navigate = useNavigate();

  const PageChange = (url) => {
    Navigate(url);
  };

  const inputRef = useRef(null);
  const [fileName, setFileName] = useState("No files chosen");
  const [files, setFiles] = useState();
  const [, setNavState, transcriptID, setTranscriptID] =
    useContext(SessionContext);
  const [showModal, setShowModal] = useState(false);
  const [flowName, setFlowName] = useState({ name: "" });

  const handleClick = () => {
    // open file input box on click of button
    inputRef.current.click();
  };

  //What happens when file is chosen
  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    // reset file input
    event.target.value = null;
    // Set display name of file
    setFileName(fileObj.name);
    const fileReader = new FileReader();
    fileReader.readAsText(fileObj, "UTF-8");
    fileReader.onload = (event) => {
      try {
        setFiles(JSON.parse(event.target.result));
      } catch (error) {
        // for case when someone uploads a valid transcript at first, then switches to a bad one.
        // it resets files to null to correctly display failure message.
        setFiles(null);
      }
    };
  };

  //Handling name change as user enters flow name
  const handleFlowNameChange = (event) => {
    setFlowName({ ...flowName, [event.target.name]: event.target.value });
  };

  return (
    <div className="container">
      <h1 className={styles.title}>Upload Transcript</h1>
      {fileName !== "No files chosen" && files && !files.questions ? (
        <h4 className={styles.failureIndicator}>
          Please upload a valid JSON file.
        </h4>
      ) : (
        <></>
      )}
      <div className={styles.buttonContainer}>
        <input
          style={{ display: "none" }}
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
          accept=".json"
        />
        <button className={styles.button} onClick={handleClick}>
          <img
            src={require("../../assets/uploadicon.png")}
            alt={"upload"}
            className={styles.uploadIcon}
          />
          Choose File
        </button>
      </div>
      <h4 className={styles.subtitle}> {fileName} </h4>
      <div className={styles.buttonContainerNew}>
        <GenericButton
          buttonType={files && files.questions ? "blue" : "disabled"}
          onClick={() => {
            // Checks if the transcript is a string, and then sends transcript to DB
            transcriptJSONConverter(fileName, files).then((response) => {
              if (response) {
                setShowModal(true);
                setTranscriptID(response);
              } else {
                // prompts alert when you try to upload a transcript that is already posted onto DB
                alert("This file was already uploaded.");
              }
            });
          }}
          disabled={files && files.questions ? false : true}
          text={"Begin Session"}
        />
        <GenericButton
          buttonType="outline"
          onClick={() => {
            PageChange("/");
            setNavState(false);
          }}
          disabled={false}
          text={"Go Back"}
        />
        {setShowModal && (
          <Modal
            show={showModal}
            title="Name your flow to begin"
            body="Enter your flow name"
            value={flowName.name}
            onChange={handleFlowNameChange}
            onClose={() => {
              setShowModal(false);
              deleteFile(transcriptID);
            }}
            onSubmit={() => {
              flowUploader(flowName.name, files).then((response) => {
                if (response) {
                  alert("Your flow name has been set to: " + flowName.name);
                  PageChange("/startingintent");
                  setNavState(true);
                } else {
                  alert("Please enter a valid flow name.");
                }
              });
            }}
          />
        )}
      </div>
    </div>
  );
}
export default UploadTranscript;
