import React, { Component } from "react";
import axios from "axios";
import "./recoverSession.css";
import GenericButton from "../../Components/Buttons/GenericButton";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { withRouter } from "../../withRouter";


class RecoverSession extends Component {
  constructor(props) {
    super(props);

    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    };

    handleChange(event) {    
      this.setState({value: event.target.value});
    }
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }
    handleBack(event) {
      this.props.navigate('/') 
    }

  render() {
    return (
      <div className="container">
        <h1 className="pageTitle">
          Recover Session
        </h1>
      <form className="inputForm w-1/3 mx-auto" onSubmit={this.handleSubmit}> 
          <label className="text-xl text-white font-nunito font-medium"> Input Session ID </label>
          <input className="m-6 w-3/4 pl-4 pr-2 pt-2 pb-2 block rounded-full text-black" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Session ID" />        
          <GenericButton
              buttonType="white"
              onClick={() => this.handleChange}
              disabled={false}
              text={"Begin Session"}
            />
      </form>
      <div className="buttonContainer">
        <GenericButton
              buttonType="outline"
              onClick={this.handleBack}
              disabled={false}
              text={"Go Back"}
            />
      </div>
      </div>
    );
  }
}

export default withRouter(RecoverSession);

// FUNCTIONAL REACT VRSN:
// function RecoverSession() {
//   const Navigate = useNavigate();
//   const PageChange = (url) => {
//   Navigate(url);
//   }

//     const [name, setName] = useState(0);

//     const handleSubmit = (event) => {
//       event.preventDefault();
//       alert(`The name you entered was: ${name}`)
//       console.log(name)
//     }

//     return (
//       <div className="container">
//         <h1 className="pageTitle">
//           Recover Session
//         </h1>
//       <form>
//         <label>Enter your name:
//           <input 
//             type="text" 
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </label>
//         <input type="submit" />
//       </form>
//       <div className="buttonContainer">
//         <GenericButton
//               buttonType="outline"
//               onClick={() => PageChange("/")}
//               disabled={false}
//               text={"Go Back"}
//             />
//       </div>
//       </div>
//     );
//   }
//   export default RecoverSession
