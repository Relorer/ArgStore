import { IconButton } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { observer } from "mobx-react";
import React, { useContext, useEffect, useState } from "react";

import { Game } from "../../models/ApiModel";
import { GamesService } from "../../services/GamesService";
import { GamesServiceContext } from "../../services/GamesServiceProvider";
import { UserService } from "../../services/UserService";
import { UserServiceContext } from "../../services/UserServiceProvider";
import GameCard from "../GameCard";

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
