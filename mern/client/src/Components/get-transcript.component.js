import React, { Component } from "react";
import axios from "axios";

export default class GetTranscript extends Component {
  constructor(props) {
    super(props);

    this.state = { transcript: [] };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/transcript/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            transcript: response.data.map(
              (transcript) => transcript.transcript
            ),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleClick() {
    console.log("yay");
    axios.post("http://localhost:5000/transcript/add");
    console.log("YAY");
  }

  render() {
    return (
      <div>
        <h3 className="p-2">Transcript shows here!</h3>
        <button
          type="button"
          class="btn btn-primary btn-lg btn-block"
          onClick={this.handleClick}
        >
          Generate Transcript!
        </button>

        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Transcript</th>
            </tr>
          </thead>
          <tbody>
            {this.state.transcript.map(function (transcript) {
              return (
                <option key={transcript} value={transcript}>
                  {transcript}
                </option>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
