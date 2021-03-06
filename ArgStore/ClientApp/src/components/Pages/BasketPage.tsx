import {
    Button,
    createStyles,
    Grid,
    Link,
    makeStyles,
    Theme,
    Typography,
} from "@material-ui/core";
import { observer } from "mobx-react";
import React, { useContext, useEffect, useState } from "react";

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
            <h2>Корзина</h2>
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
                        <Grid item xs={12} key={g.Id}>
                            <BasketGameCard game={g.game} />
                        </Grid>
                    ))}
                    <Grid
                        item
                        container
                        xs={12}
                        justify="space-between"
                        alignItems="center"
                        className={classes.bottomMenu}
                    >
                        <Grid item xs={9}>
              Total: $
                            {AuthInfo.user?.basket.basketGames
                .map((g) => g.game.price)
                .reduce((g1, g2) => g1 + g2)}
                        </Grid>
                        <Grid
                            item
                            container
                            xs={3}
                            alignItems="flex-end"
                            justify="flex-end"
                        >
                            <Grid item>
                                <Button variant="contained" color="primary" href="/purchase">
                  Купить
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </div>
    );
});

export default BasketPage;
