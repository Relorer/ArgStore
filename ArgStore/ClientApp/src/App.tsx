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

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <GamesServiceProvider>
        <SearchAppBar></SearchAppBar>
        <Switch>
          <Route exact path="/" component={GameListPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/:id" component={GamePage} />
        </Switch>
        <Footer></Footer>
      </GamesServiceProvider>
    );
  }
}
