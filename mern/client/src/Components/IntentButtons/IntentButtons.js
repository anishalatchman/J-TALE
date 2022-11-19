import React, { Component } from "react";
import "./IntentButtons.module.css";

/**
 * A generic button component
 * @module IntentButtons
 
 @prop {String} [buttonType] : predefined style of buttons ('blue', 'outline', 'disabled', 'black')
 @prop {boolean} [disabled] : whether the button is disabled
 @prop {function} [onClick] : the function to be executed on click
 @prop {String} [text] : Text to be displayed on the button
**/

export default function IntentButtons(props) {
  return (
    <div>
      {intents.map((entry) => {
        return (
          <button
            key={entry.value}
            style={
              entry.value === asyncStorageAdvancedTradeSettings.intents
                ? StyleSheet.buttonSelected
                : StyleSheet.buttonUnselected
            }
            onClick={() => {
              setAsyncStorageAdvancedTradeSettings((props) => {
                props.intents = entry.value;

                setItemInAsyncStore("intent", entry.value);

                return { ...props };
              });
            }}
          ></button>
        );
      })}
    </div>
  );
}

//       props.intents
