import React, { Component } from "react";
import axios from "axios";
import "./landing.css";
import GenericButton from "../../Components/Buttons/GenericButton";
export default class Landing extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
    };

    console.log(user);

    axios
      .post("http://localhost:5000/users/add", user)
      .then((res) => console.log(res.data));

    this.setState({
      username: "",
    });
  }

  render() {
    return (
      <div className="container">
        <h1 className="h1 title">
          Transcript to chatbot <br /> with a couple clicks
        </h1>
        <h4 className="subtitle">A flow-building plugin for Voiceflow</h4>
        <div className="buttonContainer">
          <GenericButton
            buttonType="blue"
            onClick={() => null}
            disabled={false}
            text={"Upload Transcript"}
          />
          <GenericButton
            buttonType="outline"
            onClick={() => null}
            disabled={false}
            text={"Recover Session"}
          />
        </div>
      </div>
    );
  }
}
