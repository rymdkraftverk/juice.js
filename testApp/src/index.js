import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components/macro'
import App from './App'
import Color from './constant/color'

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

  /* Remove link default style */
  a {
    color: inherit;
    text-decoration: none;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
