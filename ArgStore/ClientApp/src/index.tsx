import "./index.scss";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { GamesServiceProvider } from "./services/GamesServiceProvider";
import { SnackBarProvider } from "./services/SnackBarProvider";
import { UserServiceProvider } from "./services/UserServiceProvider";

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
