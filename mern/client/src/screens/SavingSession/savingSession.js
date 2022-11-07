import React, { Component } from "react";
import "./savingSession.css";
import GenericButton from "../../Components/Buttons/GenericButton";
import { withRouter } from "../../withRouter";
import axios from "axios";
import { useState } from "react";

class SavingSession extends Component {
  constructor(props) {
    super(props);

    this.state = {value: ''};
    this.handleHome = this.handleBack.bind(this);
    // this.handleBack = this.handleBack.bind(this);
    };

    handleHome(event) {
        this.props.navigate('/') 
      }

    //   UNCOMMENT ONCE INTENT PAGE IS MERGED
    // handleBack(event) {
    //   this.props.navigate('/startingIntent') 
    // }

  render() {
    return (
      <div className="container">
        <h1 className="pageTitle">
          Session Saved
        </h1>
      <form className="inputForm w-1/3 mx-auto" onSubmit={this.handleSubmit}> 
          <label className="text-xl text-white font-nunito font-medium"> Input Session ID </label>
          <input className="m-6 w-3/4 pl-4 pr-2 pt-2 pb-2 block rounded-full text-black" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Session ID" />        
          <GenericButton
              buttonType="white"
              onClick={() => this.handleChange}
              disabled={false}
              text={"Copy to Clipboard"}
            />
      </form>
      <div className="buttonRow">
      <GenericButton
              buttonType="blue"
              onClick={this.handleHome}
              disabled={false}
              text={"End Session"}
            />
        <GenericButton
              buttonType="outline"
              onClick={() => null}
              disabled={false}
              text={"Go Back"}
            />
      </div>
      </div>
    );
  }
}

export default withRouter(SavingSession);

