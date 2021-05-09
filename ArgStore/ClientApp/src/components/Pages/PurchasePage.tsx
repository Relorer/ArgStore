import {
    Button,
    createStyles,
    FormControl,
    Grid,
    InputLabel,
    makeStyles,
    Select,
    Theme,
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import { observer } from "mobx-react";
import React, { useContext, useEffect, useState } from "react";

import { GamesService } from "../../services/GamesService";
import { GamesServiceContext } from "../../services/GamesServiceProvider";
import { UserService } from "../../services/UserService";
import { UserServiceContext } from "../../services/UserServiceProvider";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: "20px 0 0 0",
        },
        textField: {
            margin: "0 20px",
            boxSizing: "border-box",
        },
        cover: {
            width: "100%",
        },
        button: {
            margin: "0 10px 0 0",
        },
        formControl: {
            minWidth: 200,
        },
        divider: {},
    })
);

const PurchasePage = observer(() => {
    const classes = useStyles();
    const { AuthInfo, clearBasket } = useContext(
        UserServiceContext
    ) as UserService;
    const { games, update, create, refreshGames } = useContext(
        GamesServiceContext
    ) as GamesService;

    if (AuthInfo.user?.basket.basketGames.length === 0) {
        document.location.href = "/";
    }

    return (
        <div className={classes.root}>
            <h2>Оплата</h2>
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item>К оплате:</Grid>
                        <Grid item style={{ fontWeight: "bold" }}>
              $
                            {AuthInfo.user?.basket.basketGames
                .map((g) => g.game.price)
                .reduce((g1, g2) => g1 + g2)}
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item>
                    <Divider className={classes.divider} />
                </Grid>

                <Grid item>
                    <FormControl className={classes.formControl}>
                        <InputLabel>способ оплаты</InputLabel>
                        <Select defaultValue={10}>
                            <MenuItem value={10}>WebMoney</MenuItem>
                            <MenuItem value={20}>Банковская карта</MenuItem>
                            <MenuItem value={30}>PayPal</MenuItem>
                            <MenuItem value={40}>Билайн</MenuItem>
                            <MenuItem value={50}>Tele2</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item container spacing={1}>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            href="thanks"
                            onClick={clearBasket}
                        >
              Оплатить
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth href="/" style={{ color: "#777" }}>
              Отказаться от оплаты и вернуться в магазин
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
});

export default PurchasePage;
