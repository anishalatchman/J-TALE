import React from "react";
import "./ButtonStyleSheet.css";

/**
 * A generic button component
 * @module GenericButton
 
 @prop {String} [buttonType] : predefined style of buttons ('blue', 'outline', 'disabled', 'black')
 @prop {boolean} [disabled] : whether the button is disabled
 @prop {function} [onClick] : the function to be executed on click
 @prop {String} [text] : Text to be displayed on the button
 @prop {}
**/

export default function GenericButton(props) {
  return (
    <button
      className={props.buttonType}
      style={props.className}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
}
