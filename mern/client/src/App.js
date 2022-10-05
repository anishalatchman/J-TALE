import logo from './logo.svg';
import './App.css';
import * as React from 'react';

function App() {
  // const axios = require('axios');

  // // View our quick start guide to get your API key:
  // // https://www.voiceflow.com/api/dialog-manager#section/Quick-Start
  // const apiKey = 'VF.DM.633ccf1ff8b6f600072caa42.VsDy3SIG7hSTI6NA';
  
  // const userID = 'user_123'; // Unique ID used to track conversation state
  // const userInput = 'Hello world!'; // User's message to your Voiceflow project
  
  // const body = {
  //   action: {
  //     type: 'text',
  //     payload: userInput,
  //   },
  // };
  
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
        <button type="button" className='Main-button'>J TALE is the best!</button>
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
