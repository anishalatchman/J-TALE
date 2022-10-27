import React, { Component } from "react";
import "./uploadTranscript.css";
import "./../../Components/Buttons/ButtonStyleSheet.css";
import GenericButton from "../../Components/Buttons/GenericButton";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

function UploadTranscript() {
  const Navigate = useNavigate();
  const PageChange = () => {
    Navigate("/");
  };
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState("No files chosen");
  const [files, setFiles] = useState("");

  const handleClick = () => {
    // open file input box on click of button
    inputRef.current.click();
  };

  //What happens when file is chosen
  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    console.log(typeof event.target.files[0]);
    console.log(event.target.files[0]);
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
      <h4 className="subtitle"> {fileName + files} </h4>
      <div className="buttonContainer2">
        <GenericButton
          buttonType="blue"
          onClick={() => null}
          disabled={false}
          text={"Begin Session"}
        />
        <GenericButton
          buttonType="outline"
          onClick={() => {
            PageChange();
          }}
          disabled={false}
          text={"Go Back"}
        />
      </div>
    </div>
  );
}
export default UploadTranscript;
