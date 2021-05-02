import {
  Button,
  Container,
  createStyles,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React, { FC, useContext, useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import { useParams } from "react-router";
import TextField from "@material-ui/core/TextField";
import { UserServiceContext } from "../../services/UserServiceProvider";
import { SnackBarContext } from "../../services/SnackBarProvider";
import { UserService } from "../../services/UserService";
import { observer } from "mobx-react";

const useStyles = makeStyles(() =>
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

const SignupPage = observer(() => {
  const classes = useStyles();
  const snackBar = useContext(SnackBarContext);
  const { notify } = snackBar || {};

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { signup } = useContext(UserServiceContext) as UserService;

  const _signup = async () => {
    try {
      await signup({
        login: login,
        password: password,
        passwordConfirm: passwordConfirm,
      });
      window.history.back();
    } catch (e) {
      if (notify) notify(e.message, "error");
      else console.log(e);
    }
  };

  return (
    <div className={classes.root}>
      <h1>Регистрация</h1>
      <TextField
        label="Логин"
        className={classes.textField}
        value={login}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(v) => setLogin(v.target.value)}
      />
      <TextField
        label="Пароль"
        type="password"
        value={password}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(v) => setPassword(v.target.value)}
      />
      <TextField
        label="Повторите пароль"
        type="password"
        className={classes.textField}
        value={passwordConfirm}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(v: any) => setPasswordConfirm(v.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => {
          _signup();
        }}
      >
        Подтвердить
      </Button>
    </div>
  );
});

export default SignupPage;
