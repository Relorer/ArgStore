import React, { useContext, useEffect, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Pagination from "@material-ui/lab/Pagination";
import Divider from "@material-ui/core/Divider";
import GameCard from "../GameCard";
import { getGames } from "../../api/GamesApi";
import { Game } from "../../models/ApiModel";
import { GamesServiceContext } from "../../services/GamesServiceProvider";
import { observer } from "mobx-react";
import { Card, CardActionArea, CardContent } from "@material-ui/core";
import { getAuthInfo } from "../../api/Auth";

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
    })
);

const GameListPage = observer(() => {
    const classes = useStyles();
    const [isAuth, setIsAuth] = useState(false);
    const [role, setRole] = useState();

    const checkAuth = async () => {
        const res = await getAuthInfo();
        setIsAuth(res.isAuth);
        console.log(res);
        if (res.isAuth) setRole(res.role);
    };
    checkAuth();

    const gamesService = useContext(GamesServiceContext);
    if (!gamesService) {
        return <p className="center">GamesServiceContext is missing</p>;
    }
    const { games, refreshGames, create } = gamesService;

    useEffect(() => {
        refreshGames();
    }, []);

    const selectedGame = (games: Game[], id: number) => {
        return games.find((element) => element.id === id);
    };

    return (
        <Grid container justify="center" className={classes.root}>
            <Grid item>
                <Grid container spacing={1}>
                    {games.map((value: Game) => (
                        <Grid key={value.id} item>
                            <GameCard game={selectedGame(games, value.id || 0)} />
                        </Grid>
                    ))}
                    {isAuth && role == "admin" ? (
                        <Grid item>
                            <Card>
                                <CardActionArea onClick={() => create()}>
                                    <CardContent>
                                        <img
                                            className={classes.cover}
                                            src="https://cdn2.iconfinder.com/data/icons/arrows-and-universal-actions-icon-set/256/plus-512.png"
                                        ></img>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ) : (
                        <></>
                    )}
                </Grid>
            </Grid>
            <Divider className={classes.divider} />
            {/* <Pagination
        color="primary"
        className={classes.pagination}
        count={10}
        showFirstButton
        showLastButton
      /> */}
        </Grid>
    );
});

export default GameListPage;
