import React, { useState, useContext } from "react";
import "./recoverSession.css";
import GenericButton from "../../Components/Buttons/GenericButton";
import { NavStateContext } from "../../Components/Navbar/navState";
import { useNavigate } from "react-router-dom";

export default function RecoverSession() {
  const Navigate = useNavigate();
  const [sessionid, setSessionID] = useState("");
  const [, setNavState] = useContext(NavStateContext);

  const PageChange = (url) => {
  Navigate(url);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // show navbar buttons for starting-intent page
    setNavState(true) 
    alert(`The session ID you entered was: ${sessionid}`)
  }

  const handleChange = (event) => {
    // set sessionid to input text
    setSessionID(event.target.value);
  }

    return (
      <div className="container">
        <h1 className="pageTitle">Recover Session</h1>
        <form className="inputForm w-1/3 mx-auto" onSubmit={handleSubmit}>
          <label className="text-xl text-white font-nunito font-medium">
            Input Session ID
          </label>
          <input
            className="m-6 w-3/4 pl-4 pr-2 pt-2 pb-2 block rounded-full text-black"
            type="text"
            value={sessionid}
            onChange={handleChange}
            placeholder="Session ID"
          />
          <GenericButton
            buttonType="white"
            onClick={() => handleSubmit}
            disabled={false}
            text={"Begin Session"}
          />
        </form>
        <div className="buttonContainer">
          <GenericButton
            buttonType="outline"
            onClick={() => {
              PageChange("/");
              setNavState(false);
            }}
            disabled={false}
            text={"Go Back"}
          />
        </div>
      </div>
    );
  }

// CLASS COMPONENT VRSN:
// class RecoverSession extends Component {

//   constructor(props) {
//     super(props);

//     this.state = { value: "" };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleBack = this.handleBack.bind(this);
//   }

//   handleChange(event) {
//     this.setState({ value: event.target.value });
//   }
//   handleSubmit(event) {
//     alert("A name was submitted: " + this.state.value);
//     event.preventDefault();
//   }
//   handleBack(event) {
//     this.props.navigate("/");
//   }

//   render() {
//     return (
//       <div className="container">
//         <h1 className="pageTitle">Recover Session</h1>
//         <form className="inputForm w-1/3 mx-auto" onSubmit={this.handleSubmit}>
//           <label className="text-xl text-white font-nunito font-medium">
//             {" "}
//             Input Session ID{" "}
//           </label>
//           <input
//             className="m-6 w-3/4 pl-4 pr-2 pt-2 pb-2 block rounded-full text-black"
//             type="text"
//             value={this.state.value}
//             onChange={this.handleChange}
//             placeholder="Session ID"
//           />
//           <GenericButton
//             buttonType="white"
//             onClick={() => this.handleChange}
//             disabled={false}
//             text={"Begin Session"}
//           />
//         </form>
//         <div className="buttonContainer">
//           <GenericButton
//             buttonType="outline"
//             onClick={this.handleBack}
//             disabled={false}
//             text={"Go Back"}
//           />
//         </div>
//       </div>
//     );
//   }
// }

// export default withRouter(RecoverSession);