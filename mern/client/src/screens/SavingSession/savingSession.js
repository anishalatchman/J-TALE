import React, { Component } from "react";
import "./savingSession.module.css";
import GenericButton from "../../Components/Buttons/GenericButton";
import { withRouter } from "../withRouter";

class SavingSession extends Component {
  constructor(props) {
    super(props);

    this.state = { value: "17A540" };
    this.handleBack = this.handleBack.bind(this);
  }

  setSessionID(id) {
    this.setState({ value: id });
  }
  handleBack(event) {
    this.props.navigate("/");
  }
  copyText(event) {
    event.preventDefault();
    // Get the text field
    var textToCopy = document.getElementById("sessionID");

    // Select the text field
    textToCopy.select();
    textToCopy.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(textToCopy.value);
  }

  render() {
    return (
      <div>
        <div className="container">
          <h1 className="pageTitle"> Session Saved </h1>
          <h4 className="subTitle">
            You will need your session ID to continue next time.
          </h4>
          <form className="inputForm w-1/3 mx-auto">
            <label className="text-xl text-white font-nunito font-medium">
              {" "}
              Your Session ID{" "}
            </label>
            <input
              className="m-6 w-3/4 pl-4 pr-2 pt-2 pb-2 text-center block rounded-full font-nunito"
              id="sessionID"
              type="text"
              readonly
              value={this.state.value}
            />
            <GenericButton
              buttonType="white"
              onClick={this.copyText}
              disabled={false}
              text={"Copy to Clipboard"}
            />
          </form>

          <div className="buttonRow">
            <GenericButton
              buttonType="blue"
              onClick={() => null}
              disabled={false}
              text={"End Session"}
            />
            <GenericButton
              buttonType="outline"
              onClick={this.handleBack}
              disabled={false}
              text={"Go Back"}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SavingSession);
