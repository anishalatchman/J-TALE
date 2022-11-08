import React, { Component } from "react";
import "./savingSession.css";
import GenericButton from "../../Components/Buttons/GenericButton";
import { withRouter } from "../../withRouter";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

class SavingSession extends Component {
  constructor(props) {
    super(props);

    this.state = {value: ''};
    this.handleBack = this.handleBack.bind(this);
    };

    handleBack(event) {
      this.props.navigate('/');
    };
 

  render() {
    return (
      <div>
      <div className="container">
        <h1 className="pageTitle"> Session Saved </h1>
        <h4 className="subTitle">You will need you session ID to continue next time.</h4>
      <form className="inputForm w-1/3 mx-auto"> 
          <label className="text-xl text-white font-nunito font-medium"> Your Session ID </label>
          <input className="m-6 w-3/4 pl-4 pr-2 pt-2 pb-2 block rounded-full text-black" type="text" value={this.state.value} onChange={this.handleBack} placeholder="Session ID" />        
          <GenericButton
              buttonType="white"
              onClick={() => this.handleBack}
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