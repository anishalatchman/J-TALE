import React from "react";
import "./uploadTranscript.css";
import "./../../Components/Buttons/ButtonStyleSheet.css";
import GenericButton from "../../Components/Buttons/GenericButton";
import { useRef, useState, useContext } from "react";
import { transcriptJSONConverter } from "../../utils/transcript";
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
  const [openFlowNameModal, setOpenFlowNameModal] = useState(false);
  const [, setNavState] = useContext(SessionContext);
  const [show, setShowModal] = useState(false);

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
      setFiles(event.target.result);
    };
  };

  return (
    <div className="container">
      <h1 className="h1 title">Upload Transcripts</h1>
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
                setNavState(true);
              } else {
                alert("Please upload a valid JSON file.");
              }
              // response
              //   ? setShowModal(true) && setNavState(true)
              //   : alert("Please upload a valid JSON file.");
              // note: no clue on why this "&&"" doesn't work for "AND"??
              // I can resort to if/else statements but it would be great to get this short line of code to work instead.
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
            show={show}
            title="Name your flow to begin"
            body="Enter flow name here"
            onClose={() => setShowModal(false)}
            // note: it would be good to have a function that deletes the uploaded transcript from the DB when user presses cancel
            // since right now, if they accidentally press cancel, they cannot use the transcript they were going to use again
            onSubmit={() => PageChange("/startingintent")}
          />
        )}
      </div>
    </div>
  );
}
export default UploadTranscript;
