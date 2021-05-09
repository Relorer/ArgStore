import { Container } from "@material-ui/core";
import { observer } from "mobx-react";
import React, { Component, useContext, useState } from "react";
import { Route, Switch } from "react-router-dom";

import SearchAppBar from "./components/AppBar";
import Footer from "./components/Footer";
import BasketPage from "./components/Pages/BasketPage";
import GameListPage from "./components/Pages/GameListPage";
import GamePage from "./components/Pages/GamePage";
import LoginPage from "./components/Pages/LoginPage";
import PurchasePage from "./components/Pages/PurchasePage";
import SignupPage from "./components/Pages/SignupPage";
import ThanksPage from "./components/Pages/ThanksPage";
import { UserService } from "./services/UserService";
import { UserServiceContext } from "./services/UserServiceProvider";

const App = observer(() => {
    const { AuthInfo } = useContext(UserServiceContext) as UserService;

    return (
        <>
            <div className={"mainContainer"}>
                <SearchAppBar></SearchAppBar>
                <Container>
                    {AuthInfo.role === "noload" ? (
                        <></>
                    ) : AuthInfo.isAuth ? (
                        <Switch>
                            <Route exact path="/" component={GameListPage} />
                            <Route exact path="/purchase" component={PurchasePage} />
                            <Route exact path="/signup" component={GameListPage} />
                            <Route exact path="/signin" component={GameListPage} />
                            <Route exact path="/basket" component={BasketPage} />
                            <Route exact path="/thanks" component={ThanksPage} />
                            <Route exact path="/:id" component={GamePage} />
                        </Switch>
                    ) : (
                        <Switch>
                            <Route exact path="/" component={GameListPage} />
                            <Route exact path="/purchase" component={LoginPage} />
                            <Route exact path="/signup" component={SignupPage} />
                            <Route exact path="/signin" component={LoginPage} />
                            <Route exact path="/basket" component={LoginPage} />
                            <Route exact path="/:id" component={GamePage} />
                        </Switch>
                    )}
                </Container>
                <div className={"footerSpace"} />
            </div>
            <Footer></Footer>
        </>
    );
});

export default App;
