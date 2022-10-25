import React, { Component } from "react";
import axios from "axios";
import "./recoverSession.css";

export default class RecoverSession extends Component {
  constructor(props) {
    super(props);

    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(event) {    
      this.setState({value: event.target.value});  
    }
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }

  render() {
    return (
      <div className="container w-50">
        <h1 className="h1 title">
          Recover Session
        </h1>
      <form className="inputForm" onSubmit={this.handleSubmit}> 
          <label> Input Session ID </label>
          <input className="m-6 pl-4 pr-2 pt-2 pb-2 block rounded-full" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Session ID" />        
          <input className="whiteFillButton" type="submit" value="Begin Session" />
      </form>
      <div className="buttonContainer">
          <button className="blueOutlineButton">Go Back</button>
      </div>
      </div>
    );
  }
}
