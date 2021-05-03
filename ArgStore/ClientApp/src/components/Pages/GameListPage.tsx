import React, { useContext, useEffect, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import GameCard from "../GameCard";
import { Game, Role } from "../../models/ApiModel";
import { GamesServiceContext } from "../../services/GamesServiceProvider";
import { observer } from "mobx-react";
import { GamesService } from "../../services/GamesService";
import { UserService } from "../../services/UserService";
import { UserServiceContext } from "../../services/UserServiceProvider";
import {
  Card,
  CardActionArea,
  CardContent,
  IconButton,
} from "@material-ui/core";
import { getAuthInfo } from "../../api/Auth";
import AddIcon from "@material-ui/icons/Add";

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
    cover: {
      width: "100px",
    },
    addButton: {
      position: "fixed",
      right: "50px",
      bottom: "150px",
    },
  })
);

const GameListPage = observer(() => {
  const classes = useStyles();

  const { games, update, create, refreshGames } = useContext(
    GamesServiceContext
  ) as GamesService;

  const { AuthInfo, addGameToBasket } = useContext(
    UserServiceContext
  ) as UserService;

  useEffect(() => {
    refreshGames();
  }, []);

  const selectedGame = (id: string): Game => {
    const result = games.find((element) => element.id === id);
    if (result) return result;
    throw "id is not found";
  };

  return (
    <>
      <Grid container justify="center" className={classes.root}>
        <Grid item>
          <Grid container spacing={1}>
            {games.map((value: Game) => (
              <Grid key={value.id} item>
                <GameCard game={selectedGame(value.id || "")} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>
        {/* <Pagination
        color="primary"
        className={classes.pagination}
        count={10}
        showFirstButton
        showLastButton
      /> */}
      </Grid>
      {AuthInfo.role === "admin" ? (
        <IconButton
          color="primary"
          className={classes.addButton}
          onClick={() => create()}
        >
          <AddIcon />
        </IconButton>
      ) : null}
    </>
  );
});

export default GameListPage;
