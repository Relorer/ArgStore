import {
  Box,
  Button,
  createStyles,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
  Select,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { GamesServiceContext } from "../../services/GamesServiceProvider";
import { Game } from "../../models/ApiModel";
import { useParams } from "react-router";
import TextField from "@material-ui/core/TextField";
import { Rating } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import SettingsIcon from "@material-ui/icons/Settings";
import CheckIcon from "@material-ui/icons/Check";
import { UserService } from "../../services/UserService";
import { GamesService } from "../../services/GamesService";
import { UserServiceContext } from "../../services/UserServiceProvider";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";

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
