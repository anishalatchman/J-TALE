import React from "react";
import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./uploadTranscript.css";
import GenericButton from "../../Components/Buttons/GenericButton";
import Modal from "../../Components/Modals/GenericModal";
import { transcriptJSONConverter } from "../../utils/transcript";
import { deleteFile } from "../../utils/transcript";
import { flowUploader } from "../../utils/startScreen";
import { SessionContext } from "../../Components/Contexts/sessionProvider";

function UploadTranscript() {
  const Navigate = useNavigate();

  const PageChange = (url) => {
    Navigate(url);
  };

  const inputRef = useRef(null);
  const [fileName, setFileName] = useState("No files chosen");
  const [files, setFiles] = useState();
  const [, setNavState] = useContext(SessionContext);
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
      <h1 className="h1 title">Upload Transcripts</h1>
      {!files && fileName !== "No files chosen" ? (
        <h4 className="failureIndicator">Please upload a valid JSON file.</h4>
      ) : (
        <></>
      )}
      <div className="buttonContainer">
        <input
          style={{ display: "none" }}
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
          accept=".json"
        />
        <button className="button" onClick={handleClick}>
          <img
            src={require("../../assets/uploadicon.png")}
            alt={"upload"}
            className="upload-icon"
          />
          Choose File
        </button>
      </div>
      <h4 className="subtitle"> {fileName} </h4>
      <div className="buttonContainerNew">
        <GenericButton
          buttonType={files ? "blue" : "disabled"}
          onClick={() => {
            // Checks if the transcript is a string, and then sends transcript to DB
            transcriptJSONConverter(fileName, files).then((response) => {
              if (response) {
                setShowModal(true);
                global.id = response;
              } else {
                // prompts alert when you try to upload a transcript that is already posted onto DB
                alert("This file was already uploaded.");
              }
            });
          }}
          disabled={files ? false : true}
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
              console.log(global.id);
              deleteFile(global.id);
              // this global variable is correctly getting the id value, but deleteFile is not working
              // for some reason, it cannot find the transcript even with id...
            }}
            onSubmit={() => {
              setNavState(true);
              flowUploader(flowName.name, files).then((response) => {
                if (response) {
                  alert("Your flow name has been set to: " + flowName.name);
                  PageChange("/startingintent");
                } else {
                  alert("Please enter a flow name.");
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
