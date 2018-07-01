import React from "react";
import ReactDOM from "react-dom";

const rootEl = document.getElementById('root');

// Create a reusable render method that we can call more than once
let render = () => {
  // Dynamically import our main App component, and render it
  const NextApp = require('./NextApp').default;
  ReactDOM.render(
    <NextApp/>,
    rootEl
  );
};

render();
