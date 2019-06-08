import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components/macro";
import App from "./component/App";
import * as serviceWorker from "./serviceWorker";
import Color from './color';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family:
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${Color.GRAY};
    color: ${Color.WHITE};
  }
`;

ReactDOM.render(
  <div>
    <GlobalStyles />
    <App />
  </div>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
