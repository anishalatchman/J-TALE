import React from "react";
import styles from "./AlertStyling.module.css";

/**
 * A generic input modal component
 * @module GenericAlert
 */
/** @prop {boolean} [show] : whether to show alert*/
/** @prop {boolean} [success] : whether the task was successful or not*/
/** @prop {String} [message] : message to display on modal*/

const Alert = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <div className={styles.alert}>
      {props.success ? (
        <div className={styles.success}>
          <h4 className={styles.text}>{props.message}</h4>
        </div>
      ) : (
        <div className={styles.failure}>
          <h4 className={styles.text}>{props.message}</h4>
        </div>
      )}
    </div>
  );
};

export default Alert;
