import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import purple from "@material-ui/core/colors/purple";
import { GamesServiceProvider } from "./services/GamesServiceProvider";
import { UserServiceContext } from "./services/UserServiceProvider";
import { UserServiceProvider } from "./services/UserServiceProvider";
import App from "./App";

import "./index.scss";
import { SnackBarProvider } from "./services/SnackBarProvider";

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
      <SnackBarProvider>
        <UserServiceProvider>
          <GamesServiceProvider>
            <App />
          </GamesServiceProvider>
        </UserServiceProvider>
      </SnackBarProvider>
    </BrowserRouter>
  </ThemeProvider>,
  rootElement
);
