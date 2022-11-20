import React, { useContext, useEffect, useState } from "react";
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

  // for testing purposes
  const empty = {
    cheese: 2,
    pepperoni: 0,
    hawaiian: 0,
  };

  useEffect(() => {
    // Update the document title using the browser API
    console.log(intentState, "hello");
  }, [JSON.stringify(values)]);
  var values = [];

  return (
    <div className="container">
      {props.intents.map((intent) => {
        // sets the default state of current intent buttons to 0
        // we can directly mutate a dictionary
        // the code only runs if intentState[intent.value] is not initialized
        if (!intentState[intent.value]) {
          intentState[intent.value] = 0;
        }

        function changeState() {
          values = Object.keys(intentState).map(function (key) {
            return intentState[key];
          });

          for (const item of values) {
            // there can only be one intent that is double clicked
            if (item === 2 && intentState[intent.value] !== 2) {
              intentState[intent.value] = (intentState[intent.value] + 1) % 2;
              return;
            }
          }
          intentState[intent.value] = (intentState[intent.value] + 1) % 3;
        }

        return (
          <GenericButton
            key={intent.value}
            buttonType={`intent${intentState[intent.value]}`} // gets the current state (initially it is 0)
            text={intent.value}
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
