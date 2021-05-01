import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Pagination from "@material-ui/lab/Pagination";
import GameCard from "./GameCard";
import TwitterIcon from "@material-ui/icons/Twitter";
import { IconButton } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import MailIcon from "@material-ui/icons/Mail";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: "#f2f2f2",
      opacity: "0.7",
      fontSize: "14px",
      height: "120px",
      marginTop: "-120px",
    },
    content: {
      padding: "0 25px",
    },
  })
);

export default function Footer() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} alignContent="center">
      <Grid item className={classes.content}>
        Follow{" "}
        <IconButton aria-label="upload picture" component="span">
          <TwitterIcon />
        </IconButton>
        <IconButton aria-label="upload picture" component="span">
          <FacebookIcon />
        </IconButton>
        <IconButton aria-label="upload picture" component="span">
          <MailIcon />
        </IconButton>
        <div>
          © 2021—2021 Компания ARGNET. Администрация Сайта не несет
          ответственности за размещаемые Пользователями материалы (в т.ч.
          информацию и изображения), их содержание и качество.
        </div>
      </Grid>
    </Grid>
  );
}
