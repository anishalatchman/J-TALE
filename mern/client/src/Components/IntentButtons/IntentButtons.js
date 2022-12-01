import React, { useContext } from "react";
import "./IntentButtons.module.css";
import { IntentContext } from "../../Contexts/intentsProvider";
import GenericButton from "../Buttons/GenericButton";

/**
 * A generic button component
 * @module IntentButtons
 
 @prop {String} [buttonType] : predefined style of buttons ('blue', 'outline', 'disabled', 'black')
 @prop {boolean} [disabled] : whether the button is disabled
 @prop {function} [onClick] : the function to be executed on click
 @prop {String} [text] : Text to be displayed on the button
**/

export default function IntentButtons(props) {
  // define context var to determine the state of the intent buttons
  const [intentState, setIntentState] = useContext(IntentContext);

  var values = [];
  return (
    <div className="container items-center">
      {/* To be displayed when flow is completed */}
      {props.intents.map((intent) => {
        //Constant to check whether the object is a user or a bot and access their speech accordingly
        const speech = props.user ? intent.value : intent.question;
        // sets the default state of current intent buttons to 0
        // we can directly mutate a dictionary
        // the code only runs if intentState[intent.value] is not initialized
        if (!intentState[speech]) {
          intentState[speech] = 0;
        }

        function changeState() {
          values = Object.keys(intentState).map(function (key) {
            return intentState[key];
          });

          for (const item of values) {
            // there can only be one intent that is double clicked
            if (item === 2 && intentState[speech] !== 2) {
              intentState[speech] = (intentState[speech] + 1) % 2;
              changeStatus();
              return;
            }
          }
          intentState[speech] = (intentState[speech] + 1) % 3;
          changeStatus();
        }

        function changeStatus() {
          if (intentState[speech] !== 0) {
            props.user
              ? (intent.included = true)
              : (intent.question_included = true);
          } else {
            props.user
              ? (intent.included = false)
              : (intent.question_included = false);
          }
        }

        return (
          <GenericButton
            key={speech}
            buttonType={`intent${intentState[speech]}`} // gets the current state (initially it is 0)
            text={speech}
            disabled={false}
            onClick={() => {
              changeState();
              // deep copy that recreates the object
              // this is able to trigger React to re-render
              setIntentState(JSON.parse(JSON.stringify(intentState)));
            }}
          ></GenericButton>
        );
      })}
    </div>
  );
}
