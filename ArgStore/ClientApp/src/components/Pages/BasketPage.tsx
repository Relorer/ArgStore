import {
    Box,
    Button,
    createStyles,
    Grid,
    Link,
    makeStyles,
    Theme,
    Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { GamesServiceContext } from "../../services/GamesServiceProvider";
import { Game, BasketGame } from "../../models/ApiModel";
import { useParams } from "react-router";
import TextField from "@material-ui/core/TextField";
import { Rating } from "@material-ui/lab";
import { UserService } from "../../services/UserService";
import { UserServiceContext } from "../../services/UserServiceProvider";
import BasketGameCard from "../BasketGameCard";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: "10px",
        },
        textField: {
            width: "100%",
            margin: "2px 0",
            boxSizing: "border-box",
        },
        cover: {
            width: "100%",
        },
        button: {
            margin: "0 10px 0 0",
        },
        bottomMenu: {
            margin: "20px 0 0 0",
        },
    })
);

const BasketPage = observer(() => {
    const classes = useStyles();
    const { AuthInfo } = useContext(UserServiceContext) as UserService;

    const isEmpty = () =>
        !AuthInfo.user?.basket?.basketGames ||
    AuthInfo.user?.basket?.basketGames.length === 0;

    return (
        <div className={classes.root}>
            <h1>Корзина</h1>
            {isEmpty() ? (
                <Grid container>
                    <Grid item xs={12}>
                        <Typography className={classes.textField}>
              Здесь пока ничего нет 🙁
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.textField}>
              Вернитесь на <Link href="/">главную</Link>, чтобы выбрать игры по
              душе
                        </Typography>
                    </Grid>
                </Grid>
            ) : (
                <Grid container>
                    {AuthInfo.user?.basket?.basketGames.map((g) => (
                        <Grid item xs={12}>
                            <BasketGameCard game={g.game} />
                        </Grid>
                    ))}
                    <Grid
                        item
                        container
                        xs={12}
                        justify="center"
                        alignItems="center"
                        className={classes.bottomMenu}
                    >
                        <Grid item xs={11}>
              Total: $
                            {AuthInfo.user?.basket.basketGames
                .map((g) => g.game.price)
                .reduce((g1, g2) => g1 + g2)}
                        </Grid>
                        <Grid item xs={1}>
                            <Button variant="contained" color="primary" href="/purchase">
                Купить
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </div>
    );
});

export default BasketPage;
