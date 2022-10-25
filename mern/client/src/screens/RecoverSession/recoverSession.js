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
      <div>
      <form onSubmit={this.handleSubmit}> 
          <label> Input Session ID
          <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Session ID" />        
          </label>
        <input type="submit" value="Begin Session" />
      </form>
      <div className="buttonContainer">
          <button className="whiteFillButton">Begin Session</button>
          <button className="blueOutlineButton">Go Back</button>
        </div>
      </div>
    );
  }
}
