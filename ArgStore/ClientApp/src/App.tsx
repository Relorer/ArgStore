import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import GameCustomizable from "./components/admin/GameCustomizable";
import GamesCustomizable from "./components/admin/GamesCustomizable";
import SearchAppBar from "./components/AppBar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { GamesServiceProvider } from "./services/GamesServiceProvider";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <GamesServiceProvider>
        <SearchAppBar></SearchAppBar>
        {/* <Route exact path="/" component={Home} /> */}
        <Switch>
          <Route exact path="/" component={GamesCustomizable} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/:id" component={GameCustomizable} />
        </Switch>
        <Footer></Footer>
      </GamesServiceProvider>
    );
  }
}
