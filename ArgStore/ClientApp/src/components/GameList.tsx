import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Pagination from "@material-ui/lab/Pagination";
import Divider from "@material-ui/core/Divider";
import GameCard from "./GameCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      margin: 10,
    },
    control: {
      padding: theme.spacing(2),
    },
    pagination: {
      margin: "auto",
    },
    divider: {
      width: "70%",
      margin: "20px auto",
    },
  })
);

export default function GameList() {
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item>
        <Grid container spacing={1}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((value) => (
            <Grid key={value} item>
              <GameCard />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <Pagination
        color="primary"
        className={classes.pagination}
        count={10}
        showFirstButton
        showLastButton
      />
    </Grid>
  );
}
