import React, { Component } from "react";
import { Route } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./components/Home";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <>
        <Route exact path="/" component={Home} />
        <Footer></Footer>
      </>
    );
  }
}
