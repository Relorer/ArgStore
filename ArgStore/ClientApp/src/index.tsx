import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import purple from "@material-ui/core/colors/purple";
import App from "./App";

import "./index.scss";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#506AD4",
    },

    secondary: {
      main: "#F2CC39",
    },
  },
});

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const rootElement = document.getElementById("root");

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter basename={baseUrl || ""}>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
  rootElement
);
