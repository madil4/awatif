// The awatif-ui component bundle and helpers are classic scripts that read
// React from the window, so React is published there before they load
import React from "react";
import ReactDOM from "react-dom";

window.React = React;
window.ReactDOM = ReactDOM;
