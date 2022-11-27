import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as React from "react";

import Navbar from "./Components/Navbar/navbar.component";
import Landing from "./screens/Landing/landing";
import RecoverSession from "./screens/RecoverSession/recoverSession";
import UploadTranscript from "./screens/UploadTranscript/uploadTranscript";
import StartingIntent from "./screens/StartingIntent/StartingIntent";
import SavingSession from "./screens/SavingSession/savingSession";
import SessionProvider from "./Contexts/sessionProvider";
import IntentProvider from "./Contexts/intentsProvider";
// import QuestionProvider, { QuestionContext } from "./Contexts/questionProvider";

function App() {
  return (
    <Router>
      <div>
        {/* SessionProvider contains all global vars (navstate, session id) */}
        <SessionProvider>
          <IntentProvider>
            {/* <QuestionProvider> */}
            <Navbar />

            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/recover" element={<RecoverSession />} />
              <Route path="/upload" element={<UploadTranscript />} />
              <Route path="/save" element={<SavingSession />} />
              <Route path="/startingintent" element={<StartingIntent />} />
            </Routes>
            {/* </QuestionProvider> */}
          </IntentProvider>
        </SessionProvider>
      </div>
    </Router>
  );
}

export default App;
