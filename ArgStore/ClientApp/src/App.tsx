import React, { Component } from "react";
import { Route } from "react-router-dom";
import GameCustomizable from "./components/admin/GameCustomizable";
import GamesCustomizable from "./components/admin/GamesCustomizable";
import SearchAppBar from "./components/AppBar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import { GamesServiceProvider } from "./services/GamesServiceProvider";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <GamesServiceProvider>
        <SearchAppBar></SearchAppBar>
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/" component={GamesCustomizable} />
        <Route exact path="/:id" component={GameCustomizable} />
        <Footer></Footer>
      </GamesServiceProvider>
    );
  }
}
