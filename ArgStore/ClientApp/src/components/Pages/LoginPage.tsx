import {
  Button,
  Checkbox,
  Container,
  createStyles,
  FormControlLabel,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React, { FC, useContext, useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import { useParams } from "react-router";
import TextField from "@material-ui/core/TextField";
import { SnackBarContext } from "../../services/SnackBarProvider";
import { UserServiceContext } from "../../services/UserServiceProvider";
import { UserService } from "../../services/UserService";
import { observer } from "mobx-react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "10px",
    },
    textField: {
      width: "100%",
      margin: "10px 0",
      boxSizing: "border-box",
    },
    button: {
      margin: "10px 0 0 0",
    },
  })
);

const LoginPage = observer(() => {
  const classes = useStyles();
  const snackBar = useContext(SnackBarContext);
  const { notify } = snackBar || {};

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const { signin } = useContext(UserServiceContext) as UserService;

  const _login = async () => {
    try {
      await signin({
        login: login,
        password: password,
        rememberMe: rememberMe,
      });
      console.log();
      // if (window.location.pathname === "/signin") window.history.back();
    } catch (e) {
      if (notify) notify(e.message, "error");
      else console.log(e);
    }
  };

  return (
    <div className={classes.root}>
      <h1>Авторизация</h1>
      <TextField
        label="Логин"
        className={classes.textField}
        value={login}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(v): void => setLogin(v.target.value)}
      />
      <TextField
        label="Пароль"
        type="password"
        value={password}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(v): void => setPassword(v.target.value)}
      />
      <br></br>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={(): void => {
          _login();
        }}
      >
        Подтвердить
      </Button>
    </div>
  );
});

export default LoginPage;
