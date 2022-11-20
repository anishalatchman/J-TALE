import React, { useContext, useEffect } from "react";
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

  //   const empty = {};
  const empty = {
    cheese: 2,
    pepperoni: 0,
    hawaiian: 0,
  };
  //   console.log(empty, "test");
  //   console.log(empty["hi"], "test2");
  useEffect(() => {
    // Update the document title using the browser API
    console.log(intentState, "hello");
  }, [JSON.stringify(values)]);
  var values = [1, 2, 3];
  console.log(JSON.stringify(values), "hello2");
  //   const

  return (
    <div className="container">
      {props.intents.map((intent) => {
        // sets the default state of current intent buttons to 0
        // we can directly mutate a dictionary
        intentState[intent.value] = 0;
        console.log(intentState);

        function changeState() {
          values = Object.keys(intentState).map(function (key) {
            return intentState[key];
          });
          console.log(values);
          //   console.log(intentState[intent.value]);
          for (const item of values) {
            if (item === 2 && intentState[intent.value] !== 2) {
              //   intentState[intent.value] = (intentState[intent.value] + 1) % 2;
              var newValue = (intentState[intent.value] + 1) % 2;
              // making a new dictionary so that React rerenders
              var newIntentState = {};
              newIntentState.push({ key: intent.value, value: newValue });
              for (var key in intentState) {
                newIntentState[key] = intentState[key];
              }
              // return (intentState[intent.value] + 1) % 2;
            }
          }
          //   intentState[intent.value] = (intentState[intent.value] + 1) % 3;
          var newValue = (intentState[intent.value] + 1) % 3;
          // making a new dictionary so that React rerenders
          var newIntentState = {};
          newIntentState.push({ key: intent.value, value: newValue });
          for (var key in intentState) {
            newIntentState[key] = intentState[key];
          }
          //   return (intentState[intent.value] + 1) % 3;
          //   console.log(intentState[intent.value]);
          //   console.log(intentState[intent.value]);
          //   console.log(intentState);
        }

        return (
          <GenericButton
            key={intent.value}
            buttonType={`intent${newIntentState[intent.value]}`} // gets the current state (initially it is 0)
            text={intent.value}
            disabled={false}
            onClick={() => {
              changeState();
              //   setIntentState();
              console.log(`intent${newIntentState[intent.value]}`);
              //   console.log(changeState());
            }}
          ></GenericButton>
        );
      })}
    </div>
  );
}

//       props.intents
