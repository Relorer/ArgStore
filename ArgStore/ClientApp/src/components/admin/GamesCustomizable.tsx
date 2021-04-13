import {
  Container,
  createStyles,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import FiltersLeftMenu from "../FiltersLeftMenu";
import GameList from "../GameList";
import FiltersTopMenu from "../FiltersTopMenu";
import { getGames } from "../../api/GamesApi";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

export default function GamesCustomizable() {
  const classes = useStyles();

  return (
    <div>
      <Container disableGutters className={classes.root}>
        <Grid
          container
          wrap={"nowrap"}
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item>
            <GameList></GameList>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
function useState(arg0: never[]): [any, any] {
  throw new Error("Function not implemented.");
}
