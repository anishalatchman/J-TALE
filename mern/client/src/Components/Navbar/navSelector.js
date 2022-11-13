import React, { Component, useState } from "react";
import "./navbar.css";

export default function NavSelector({navHome, navButtons }) {
  // React state to manage visibility
  const [show, setShow] = useState();

  // function to toggle the boolean value
  function toggleShow() {
    setShow(!show);
  }

  return (
    <div>
        {show ? navHome : navButtons}
    </div>
  );
}
