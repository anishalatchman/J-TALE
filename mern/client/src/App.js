import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as React from "react";

import Navbar from "./Components/Navbar/navbar.component";
import GetUser from "./Components/get-user.component";
import CreateUser from "./Components/create-user.component";
import GetTranscript from "./Components/get-transcript.component";
import Landing from "./screens/Landing/landing";
import RecoverSession from "./screens/RecoverSession/recoverSession";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<RecoverSession />} />
          <Route path="/recover" element={<RecoverSession />} />
          <Route path="/get" element={<GetUser />} />
          <Route path="/user" element={<CreateUser />} />
          <Route path="/transcript" element={<GetTranscript />} />
        </Routes>
        {/* <button type="button" class="btn btn-primary btn-lg btn-block">J TALE is the best!</button> */}
      </div>
    </Router>
  );
}

export default App;
