import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Navbar from "./Components/navbar.component";
import GetUser from "./Components/get-user.component";
import CreateUser from "./Components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar>
      </Navbar>
      <Routes>
        <Route path="/get" element={<GetUser/>} />
        <Route path="/user" element={<CreateUser/>} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;