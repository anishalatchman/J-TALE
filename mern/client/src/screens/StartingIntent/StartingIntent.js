import React, { useContext } from "react";
import "./StartingIntent.css";
import "./../../Components/Buttons/ButtonStyleSheet.css";
import GenericButton from "../../Components/Buttons/GenericButton";
import { useNavigate } from "react-router-dom";
import Scrollbar from "../../Components/TranscriptScroller/transcript-scroller.component";
import { SessionContext } from "../../Contexts/sessionProvider";
import { recoverFlow } from "../../Controller/recoverSessionController"

function StartingIntent() {
  const Navigate = useNavigate();
  const [, , sessionid, ] = useContext(SessionContext);

  const PageChange = () => {
    Navigate("/");
  };
  // send session id to frontend controller which sends down to frontend dao which does axios call to backend
  // need to wait for async recoverFlow to return startingQA

  const LoadPage = async () => {
    if (sessionid) {
      console.log("this is the session id", sessionid)
      const startingQA = await recoverFlow(sessionid);
      console.log("this is the first question", startingQA);
    }
  };

  LoadPage();

  return (
    <div className="container">
        <div className="scroller">
          <Scrollbar/>
        </div>
      <div className="intentContainer">
        <h1 className="h1 intentTitle">How can I help you today?</h1>
        <div>
          <div>
            <GenericButton buttonType="intent1" text={"Order Pizza"} />
            <GenericButton buttonType="intent1" text={"Order Drink"} />
          </div>
          <div>
            <GenericButton buttonType="intent1" text={"Order Side"} />
            <GenericButton buttonType="intent1" text={"Delivery problem"} />
          </div>
        </div>
        <div>
          <h4 className="instructions">
            Select intents you would like to include by clicking once.
          </h4>
          <h4 className="instructions1">
            Choose a specific path by clicking again and selecting next.
          </h4>
        </div>
        <div>
          <GenericButton buttonType="outline" text={"Save"} />
          <GenericButton
            buttonType="outline"
            text={"Go Back"}
            disabled={true}
          />
          <GenericButton
            buttonType="disabled"
            text={"Next"}
            disabled={true}
            onClick={PageChange}
          />
        </div>
      </div>
    </div>
  );
}
export default StartingIntent;

