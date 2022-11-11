import React, { Component } from "react";
import "./ButtonStyleSheet.css";

/**
 * A generic button component
 * @module GenericButton
 */
/** @prop {String} [buttonType] : predefined style of buttons ('blue', 'outline', 'disabled', 'black')*/
/** @prop {boolean} [disabled] : whether the button is disabled*/
/** @prop {function} [onClick] : the function to be executed on click*/
/** @prop {String} [text] : Text to be displayed on the button*/

export default class GenericButton extends Component {
  render() {
    return (
      <button
        className={this.props.buttonType}
        onClick={this.props.onClick}
        disabled={this.props.disabled}
      >
        {this.props.text}
      </button>
    );
  }
}
