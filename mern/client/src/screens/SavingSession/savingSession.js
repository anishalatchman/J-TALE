import React, { useContext, useState, useEffect } from "react";
import styles from "./savingSession.module.css";
import GenericButton from "../../Components/Buttons/GenericButton";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../../Contexts/sessionProvider";
import Modal from "../../Components/Modals/GenericModal";
import emailjs from "emailjs-com";
import { FlowContext } from "../../Contexts/flow.Provider";

export default function SavingSession() {
  const [currFlow, , , , , ,] = useContext(FlowContext);
  const [sessionID, , ,] = useContext(SessionContext);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);

  const Navigate = useNavigate();
  const PageChange = (url) => {
    Navigate(url);
  };

  const handleEmailNameChange = (event) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    const validEmailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(validEmailRegex)) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
  }, [email, validEmail]);

  const sendMail = () => {
    const data = {
      flow: currFlow.name,
      session: sessionID,
      email: email,
    };

    emailjs
      .send("service_3mrwlug", "template_xesdddp", data, "8MLzKnR9kn5hriP6p")
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div>
      <div className="container">
        <h1 className={styles.pageTitle}> Session Saved </h1>
        <h4 className={styles.subTitle}>
          You will need your session ID to continue next time.
        </h4>
        <div className={styles.inputForm}>
          <label className={styles.label}> Your Session ID </label>
          <div className={styles.input}>
            <p>{sessionID}</p>
          </div>
          <div className>
            <GenericButton
              buttonType="white"
              onClick={() => {
                navigator.clipboard.writeText(sessionID);
              }}
              disabled={false}
              text={"Copy to Clipboard"}
            />
            <GenericButton
              buttonType="white"
              onClick={() => {
                setShowModal(true);
              }}
              disabled={false}
              text={"Email Session ID"}
            />
            {setShowModal && (
              <Modal
                show={showModal}
                title="Please Enter Your Email"
                body=""
                value={email}
                valid={validEmail}
                onChange={handleEmailNameChange}
                onClose={() => {
                  setShowModal(false);
                }}
                onSubmit={() => {
                  if (validEmail) {
                    sendMail();
                    setShowModal(false);
                  }
                }}
              />
            )}
          </div>
        </div>

        <div className={styles.buttonRow}>
          <GenericButton
            buttonType="blue"
            onClick={() => PageChange("/")}
            disabled={false}
            text={"End Session"}
          />
          <GenericButton
            buttonType="outline"
            onClick={() => {
              // Logic goes here if
              PageChange("/startingintent");
            }}
            disabled={false}
            text={"Go Back"}
          />
        </div>
      </div>
    </div>
  );
}
