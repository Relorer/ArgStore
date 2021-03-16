import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import AppBar from "./AppBar";
import Container from "@material-ui/core/Container";
import GameList from "./GameList";
import FiltersLeftMenu from "./FiltersLeftMenu";
import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import FiltersTopMenu from "./FiltersTopMenu";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

export default function Home() {
  const classes = useStyles();

  return (
    <div>
      <AppBar></AppBar>
      <Container disableGutters className={classes.root}>
        <Grid
          container
          wrap={"nowrap"}
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item>
            <FiltersLeftMenu></FiltersLeftMenu>
          </Grid>
          <Grid item>
            <FiltersTopMenu></FiltersTopMenu>
            <GameList></GameList>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
