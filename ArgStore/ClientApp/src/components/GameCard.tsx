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
  game: Game | undefined;
};

const GameCard: FC<GameCardProps> = ({ game }) => {
  const classes = useStyles();
  console.log("adf" + JSON.stringify(game));
  console.log(game?.name);
  if (!game) {
    console.log("asd");
    return (
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <img
              className={classes.cover}
              src="https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png"
            ></img>
            <Typography className={classes.title}>Not found</Typography>
            <Typography></Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
  return (
    <Card className={classes.root}>
      <CardActionArea
        onClick={() =>
          document.location.replace(document.location.href + game.id)
        }
      >
        <CardContent>
          <img className={classes.cover} src={game.coverPath}></img>
          <Typography className={classes.title}>{game.name}</Typography>
          <Typography>{game.priceIncludingDiscount} $</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default GameCard;
