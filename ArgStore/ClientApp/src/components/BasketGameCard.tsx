import React, { FC, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import { observer } from "mobx-react";
import { Game } from "../models/ApiModel";
import CloseIcon from "@material-ui/icons/Close";
import { Grid, IconButton } from "@material-ui/core";
import { UserService } from "../services/UserService";
import { UserServiceContext } from "../services/UserServiceProvider";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    boxShadow: "none",
    background: "transparent",
  },
  cover: {
    width: "100%",
  },
});

type BasketGameCardProps = {
  game: Game;
};

const BasketGameCard: FC<BasketGameCardProps> = observer(({ game }) => {
  const classes = useStyles();
  const { deleteGameToBasket } = useContext(UserServiceContext) as UserService;

  return (
    <Card className={classes.root}>
      <CardActionArea
        onClick={() => {
          document.location.href = "/" + game.id;
        }}
      >
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={1}>
              <img className={classes.cover} src={game.coverPath} />
            </Grid>
            <Grid item xs={10}>
              <Typography variant="h5" component="h5">
                {game.name}
              </Typography>
              <Typography>${game.discount}</Typography>
            </Grid>
            <Grid item container xs={1} justify="center" alignItems="center">
              <Grid item>
                <IconButton
                  onClick={(e) => {
                    deleteGameToBasket(game.id || "");
                    e.stopPropagation();
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});

export default BasketGameCard;
