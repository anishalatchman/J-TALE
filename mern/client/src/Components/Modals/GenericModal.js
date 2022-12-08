import React from "react";
import "./ModalStyling.css";
import GenericButton from "../Buttons/GenericButton";

/**
 * A generic input modal component
 * @module GenericModal
 */
/** @prop {boolean} [show] : whether the modal shows or not*/
/** @prop {String} [title] : title of modal, possible instructions for user*/
/** @prop {boolean} [input] : whether the modal had an input */
/** @prop {String} [body] : placeholder for text input box*/
/** @prop {String} [value] : value of input user puts in form*/
/** @prop {function} [onChange] : the function to be executed when changing input value on form*/
/** @prop {function} [onClose] : the function to be executed when CANCEL button is pressed*/
/** @prop {fuction} [onSubmit] : the function to be executed when CONTINUE button is pressed*/
/** @prop {boolean} [valid] : whether the inputted text is valid */
/** @prop {string} [alert] : what to display on alert */

const Modal = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">{props.title}</h4>
        </div>
        <div className="modal-body">
          {props.valid ? (
            <></>
          ) : (
            <div className="modal-alert"> {props.alert} </div>
          )}
          {props.input ? (
            <form>
              <input
                className="modal-input"
                type="text"
                name="name"
                placeholder={props.body}
                value={props.value}
                onChange={props.onChange}
              />
            </form>
          ) : (
            <></>
          )}
        </div>
        {props.buttons ? (
          <></>
        ) : (
          <div className="modal-footer">
            <GenericButton
              buttonType="modalCancel"
              onClick={props.onClose}
              disabled={false}
              text={"CANCEL"}
            />
            <GenericButton
              buttonType="modalContinue"
              onClick={props.onSubmit}
              disabled={false}
              text={"CONTINUE"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
