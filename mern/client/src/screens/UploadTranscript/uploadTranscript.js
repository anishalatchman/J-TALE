import React from "react";
import { useRef, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./uploadTranscript.module.css";
import GenericButton from "../../Components/Buttons/GenericButton";
import Modal from "../../Components/Modals/GenericModal";
import { SessionContext } from "../../Contexts/sessionProvider";
import { FlowContext } from "../../Contexts/flowProvider";
import { QuestionContext } from "../../Contexts/questionProvider";
import createFlowController from "../../utils/Controller/createFlowController";
import uploadFileController from "../../utils/Controller/uploadFileController";

function UploadTranscript() {
  const Navigate = useNavigate();

  const PageChange = (url) => {
    Navigate(url);
  };

  const uploadFile = new uploadFileController();

  const inputRef = useRef(null);
  const [fileName, setFileName] = useState("No files chosen");
  const [files, setFiles] = useState();
  const [, setSessionID, transcriptID, setTranscriptID] =
    useContext(SessionContext);
  const [, , , setNextQuestions, , setAllQuestions] =
    useContext(QuestionContext);
  const [showModal, setShowModal] = useState(false);
  const [flowName, setFlowName] = useState({ name: "" });
  const [alert, setAlert] = useState();
  const [
    ,
    setFlowState,
    flowStartingQuestions,
    setFlowStartingQuestions,
    flowAllQuestions,
    setFlowAllQuestions,
  ] = useContext(FlowContext);

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
        setAlert("Please upload a valid JSON file");
      }
    };
  };

  //Handling name change as user enters flow name
  const handleFlowNameChange = (event) => {
    setFlowName({ ...flowName, [event.target.name]: event.target.value });
  };

  //Uploads flow to the backend
  const uploadFlow = (
    flowName,
    flowStartingQuestions,
    flowAllQuestions,
    transcriptID
  ) => {
    const createFlow = new createFlowController();
    createFlow
      .flowUploader(
        flowName,
        flowStartingQuestions,
        flowAllQuestions,
        transcriptID
      )
      .then((response) => {
        //If response is successful, change to next page and show the additional navbar info
        if (response.status) {
          PageChange("/startingintent");
          setSessionID(response.res?.data._id);
          setFlowState(response.res?.data);
        } else {
          setAlert("Unable to create session. Please try again.");
        }
      });
  };

  //Uploads the transcript
  const uploadTranscript = (fileName, files) => {
    // Checks if the transcript is a string, and then sends transcript to DB
    uploadFile.uploadFile(fileName, files).then((response) => {
      if (response) {
        setShowModal(true);
        setTranscriptID(response);
        setAlert();
      } else {
        // prompts alert when you try to upload a transcript that is already posted onto DB
        setAlert("This file was already uploaded.");
      }
    });
  };

  //Parses through the question and sets flow a list of the initial question IDs
  const parseQAs = (questions) => {
    try {
      const res = uploadFile.createQAs(questions);
      setFlowStartingQuestions(res.startingList);
      setFlowAllQuestions(res.allQuestionList);
    } catch (e) {
      setAlert("PARSE FAILED", e.response);
    }
  };

  const getQAs = async (idList) => {
    return uploadFile.getQAList(idList);
  };

  const populatingQuestionContext = async () => {
    setNextQuestions(await getQAs(flowStartingQuestions));
    setAllQuestions(await getQAs(flowAllQuestions));
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        populatingQuestionContext();
        uploadFlow(
          flowName.name,
          flowStartingQuestions,
          flowAllQuestions,
          transcriptID
        );
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <div className="container">
      <h1 className={styles.title}>Upload Transcript</h1>
      <h4 className={styles.failureIndicator}>{alert}</h4>
      <div className={styles.buttonContainer}>
        <input
          style={{ display: "none" }}
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
          accept=".json"
        />
        <button
          className={styles.button}
          onClick={() => {
            setAlert();
            handleClick();
          }}
        >
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
            uploadTranscript(fileName, files);
            parseQAs(files.questions);
          }}
          disabled={files && files.questions ? false : true}
          text={"Begin Session"}
        />
        <GenericButton
          buttonType="outline"
          onClick={() => {
            PageChange("/");
            setSessionID();
            setSessionID();
          }}
          disabled={false}
          text={"Go Back"}
        />
        {
          <Modal
            show={showModal}
            title="Name your flow to begin"
            input={true}
            body="Enter your flow name"
            value={flowName.name}
            valid={true}
            onChange={handleFlowNameChange}
            onClose={() => {
              setShowModal(false);
              uploadFile.deleteFile(transcriptID);
              uploadFile.deleteQAs(flowAllQuestions);
            }}
            onSubmit={() => {
              populatingQuestionContext();
              uploadFlow(
                flowName.name,
                flowStartingQuestions,
                flowAllQuestions,
                transcriptID
              );
            }}
          />
        }
      </div>
    </div>
  );
}
export default UploadTranscript;
