import React, { useContext, useEffect, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Pagination from "@material-ui/lab/Pagination";
import Divider from "@material-ui/core/Divider";
import GameCard from "./GameCard";
import { getGames } from "../api/GamesApi";
import { Game } from "../models/ApiModel";
import { GamesServiceContext } from "../services/GamesServiceProvider";
import { observer } from "mobx-react";

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

const GameList = observer(() => {
    const classes = useStyles();

    const gamesService = useContext(GamesServiceContext);
    if (!gamesService) {
        return <p className="center">GamesServiceContext is missing</p>;
    }
    const { games, refreshGames } = gamesService;

    useEffect(() => {
        refreshGames();
    }, []);

    return (
        <Grid container justify="center" className={classes.root}>
            <Grid item>
                <Grid container spacing={1}>
                    {games.map((value: Game) => (
                        <Grid key={value.id} item>
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
});

export default GameList;
