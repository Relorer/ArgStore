import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import SearchAppBar from "./components/AppBar";
import Footer from "./components/Footer";
import LoginPage from "./components/Pages/LoginPage";
import { GamesServiceProvider } from "./services/GamesServiceProvider";
import Game from "./components/Pages/GamePage";
import GameListPage from "./components/Pages/GameListPage";
import GamePage from "./components/Pages/GamePage";
import SignupPage from "./components/Pages/SignupPage";
import { Container } from "@material-ui/core";
import BasketPage from "./components/Pages/BasketPage";
import { UserServiceProvider } from "./services/UserServiceProvider";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <UserServiceProvider>
        <GamesServiceProvider>
          <div className={"mainContainer"}>
            <SearchAppBar></SearchAppBar>
            <Container>
              <Switch>
                <Route exact path="/" component={GameListPage} />
                <Route exact path="/signup" component={SignupPage} />
                <Route exact path="/signin" component={LoginPage} />
                <Route exact path="/basket" component={BasketPage} />
                <Route exact path="/:id" component={GamePage} />
              </Switch>
            </Container>
            <div className={"footerSpace"} />
          </div>
          <Footer></Footer>
        </GamesServiceProvider>
      </UserServiceProvider>
    );
  }
}
