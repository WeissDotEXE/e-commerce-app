import React from "react";
import styles from "../Styles/Button.module.scss";

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`${styles.btn} ${styles.className}`}
      id={`${props.id}`}
    >
      {props.children}
    </button>
  );
};

export default Button;