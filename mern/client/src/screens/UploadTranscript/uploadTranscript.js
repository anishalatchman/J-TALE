import React from "react";
import "./uploadTranscript.css";
import "./../../Components/Buttons/ButtonStyleSheet.css";
import GenericButton from "../../Components/Buttons/GenericButton";
import { useRef, useState, useContext } from "react";
import { transcriptJSONConverter } from "../../utils/transcript";
import { flowUploader } from "../../utils/startScreen";
// import { deleteFile } from "../../utils/transcript";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../../Components/Contexts/sessionProvider";
import Modal from "../../Components/Modals/GenericModal";

function UploadTranscript() {
  const Navigate = useNavigate();

  const PageChange = (url) => {
    Navigate(url);
  };

  const inputRef = useRef(null);
  const [fileName, setFileName] = useState("No files chosen");
  const [files, setFiles] = useState();
  const [navState, setNavState] = useContext(SessionContext);
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
      setFiles(JSON.parse(event.target.result));
    };
  };

  //Handling name change as user enters flow name
  const handleFlowNameChange = (event) => {
    setFlowName({ ...flowName, [event.target.name]: event.target.value });
  };

  return (
    <div className="container">
      <h1 className="h1 title">Upload Transcripts</h1>
      {!showModal && navState ? (
        <h4 className="subtitle">Please upload a valid JSON file.</h4>
      ) : (
        <></>
      )}
      <div className="buttonContainer1">
        <input
          style={{ display: "none" }}
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
          accept=".json"
        />
        <button className="button1" onClick={handleClick}>
          <img
            src={require("../../assets/uploadicon.png")}
            alt={"upload"}
            className="upload-icon"
          />
          Choose File
        </button>
      </div>
      <h4 className="subtitle"> {fileName} </h4>
      <div className="buttonContainer2">
        <GenericButton
          buttonType={files ? "blue" : "disabled"}
          onClick={() => {
            // Checks if the transcript is a string, and then sends transcript to DB
            transcriptJSONConverter(fileName, files).then((response) => {
              if (response) {
                setShowModal(true);
              } else {
                alert("Please upload a valid JSON file.");
                // is there a way to make alert show up on page itself instead of it being a popup..?
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
            body="Enter your flow name here"
            value={flowName.name}
            onChange={handleFlowNameChange}
            onClose={() => {
              setShowModal(false);
              // deleteFile(fileName);
            }}
            // note: it would be good to have a function that deletes the uploaded transcript from the DB when user presses cancel
            // since right now, if they accidentally press cancel, they cannot use the transcript they were going to use again.
            // This current deleteFile does not work, look in transcript.js for more info
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
