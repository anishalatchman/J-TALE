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

  function changeState() {}

  return (
    <div>
      {props.intents.map(() => {
        // sets the default state of current intent buttons to 0
        // setIntentState(
        //   intentState.push({ key: props.intents.values, value: 0 })
        // );
        return (
          <GenericButton
            key={props.intents.value}
            // className={`intent${intentState[props.intents.value]}`}
            className={"intent0"}
            text={props.intents.value}
            disabled={false}
            onClick={() => {
              //   (props) => {
              //     props.intents = entry.value;
              //     "intent", entry.value;
              //     return { ...props };
              //   };
            }}
          ></GenericButton>
        );
      })}
    </div>
  );
}

//       props.intents
