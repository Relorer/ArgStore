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
import { UserServiceContext } from "../../services/UserServiceProvider";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "20px 0 0 0",
    },
    textField: {
      width: "100%",
      margin: "10px 0",
      boxSizing: "border-box",
    },
    cover: {
      width: "100%",
    },
    button: {
      margin: "0 10px 0 0",
    },
  })
);

const PurchasePage = observer(() => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>Оплата</h1>
    </div>
  );
});

export default PurchasePage;
