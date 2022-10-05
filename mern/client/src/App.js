import logo from "./logo.svg";
import "./App.css";
import * as React from "react";
import axios from "axios";
import cors from "cors";
// import * as dotenv from "dotenv";

function App() {
  // const VOICEFLOW_API_KEY = process.env.VOICEFLOW_API_KEY;
  // const versionID = process.env.VERSION_ID;App.use(cors)
  // App.use(cors);

  const VOICEFLOW_API_KEY = "VF.DM.633ccf1ff8b6f600072caa42.VsDy3SIG7hSTI6NA";
  const versionID = "6339c2e3e0ace2310edf6016";
  const url = `https://api-dm-test.voiceflow.fr/exportraw/${VOICEFLOW_API_KEY}?versionID=${versionID}`;

  // const userID = 'user_123'; // Unique ID used to track conversation state
  // const userInput = 'Hello world!'; // User's message to your Voiceflow project

  // const body = {
  //   action: {
  //     type: 'text',
  //     payload: userInput,
  //   },
  // };

  async function getUserData() {
    try {
      const response = await axios.get(url, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods":
            "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  // async function startInteract() {
  //   // Start a conversation
  //   const response = await axios({
  //     method: 'POST',
  //     baseURL: 'https://general-runtime.voiceflow.com',
  //     url: `/state/user/${userID}/interact`,
  //     headers: {
  //       Authorization: apiKey,
  //     },
  //     data: body,
  //   });

  //   // Log the response
  //   console.log(response.data);
  // }

  // startInteract().catch((error) => console.error(error));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="buttonContainer">
          <button type="button" className="Main-button">
            J TALE is the best!
          </button>
          <button
            type="button"
            className="Main-button"
            onClick={() => getUserData()}
          >
            Voiceflow!
          </button>
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
