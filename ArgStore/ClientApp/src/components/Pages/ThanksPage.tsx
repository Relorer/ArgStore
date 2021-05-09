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
  Link,
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

const ThanksPage = observer(() => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h2>Уважаемый покупатель!</h2>
      <p>Преобретенные ключи были отправлены на ваш email.</p>
      <p style={{ color: "#777" }}>
        Спасибо за покупку!
        <br />С уважением, администрация <Link href="/">ArgStore</Link>.
      </p>
    </div>
  );
});

export default ThanksPage;
