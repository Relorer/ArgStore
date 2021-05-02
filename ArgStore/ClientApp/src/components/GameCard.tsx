import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import { observer } from "mobx-react";
import { Game } from "../models/ApiModel";

const useStyles = makeStyles({
  root: {
    width: 240,
    height: "100%",
    boxShadow: "none",
    background: "transparent",
  },
  title: {
    fontSize: 16,
  },
  cover: {
    width: "100%",
  },
});

type GameCardProps = {
  game: Game;
};

const GameCard: FC<GameCardProps> = ({ game }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea href={game.id}>
        <CardContent>
          <img className={classes.cover} src={game.coverPath} />
          <Typography className={classes.title}>{game.name}</Typography>
          <Typography>{game.discount} $</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default GameCard;
