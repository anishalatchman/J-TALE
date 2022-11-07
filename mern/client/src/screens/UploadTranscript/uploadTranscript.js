import React, { Component } from "react";
import "./uploadTranscript.css";
import "./../../Components/Buttons/ButtonStyleSheet.css"
import GenericButton from "../../Components/Buttons/GenericButton";
import Scrollbar from "../../Components/TranscriptScroller/transcript-scroller.component";
import { Navigate, useNavigate } from "react-router-dom";


function UploadTranscript() {
  const Navigate = useNavigate();
  const PageChange = () => {
    Navigate("/");
  }
  return (
    <div className="container">
      <h1 className="h1 title">
        Upload Transcripts
      </h1>
      <div className="buttonContainer1">
      <button className="button1">
        <img
        src={require("../../assets/uploadicon.png")}
        alt={"upload"}
        className="upload-icon"
        />
        Choose File</button>
      </div>
      <h4 className="subtitle">No files chosen</h4>
      <div className="buttonRow">
        <GenericButton
          buttonType="blue"
          onClick={() => null}
          disabled={false}
          text={"Begin Session"}
        />
        <GenericButton
          buttonType="outline"
          onClick={() => {PageChange()}}
          disabled={false}
          text={"Go Back"}
        />
      </div>
      <div class="scroller">
          <Scrollbar/>
        </div>
    </div>
  );
}
export default UploadTranscript

// export default class Landing extends Component {
    
//     render() {
//     return (
//       <div className="container">
//         <h1 className="h1 title">
//           Upload Transcript
//         </h1>
//         <div className="buttonContainer">
//         <button className="button1">Choose File</button>
//         </div>
//         <h4 className="subtitle">No file chosen</h4>
//         <div className="buttonContainer">
//         <GenericButton
//             buttonType="outline"
//             onClick={() => null}
//             disabled={false}
//             text={"Begin Session"}
//           />
//           <GenericButton
//             buttonType="outline"
//             onClick={() => null}
//             disabled={false}
//             text={"Go Back"}
//           />
//         </div>
//       </div>
//     );
//   }
// }