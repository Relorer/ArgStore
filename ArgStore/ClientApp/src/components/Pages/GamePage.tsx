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

const GamePage = observer(() => {
  const classes = useStyles();

  const gamesService = useContext(GamesServiceContext);
  if (!gamesService) {
    return <p className="center">GamesServiceContext is missing</p>;
  }
  const { games, update, remove, refreshGames } = gamesService;

  const { id } = useParams<{ id: string }>();

  const selectedGame = (games: Game[], id: string) => {
    const def: Game = {
      id: "0",
      name: "",
      description: "",
      price: 0,
      discount: 0,
      coverPath: "",
      releaseDate: new Date(),
      rating: undefined,
      comments: undefined,
      genres: undefined,
    };
    return games.find((element) => element.id === id) || def;
  };

  const [name, setName] = useState(selectedGame(games, id).name);
  const [description, setDescription] = useState(
    selectedGame(games, id).description
  );
  const [price, setPrice] = useState(selectedGame(games, id).price);
  const [discount, setDiscount] = useState(selectedGame(games, id).discount);
  const [coverPath, setCoverPath] = useState(selectedGame(games, id).coverPath);

  const [changes, setChanges] = useState(false);

  const { AuthInfo, addGameToBasket } = useContext(
    UserServiceContext
  ) as UserService;

  useEffect(() => {
    refreshGames();
  }, []);

  useEffect(() => {
    setName(selectedGame(games, id).name);
    setDescription(selectedGame(games, id).description);
    setPrice(selectedGame(games, id).price);
    setDiscount(selectedGame(games, id).discount);
    setCoverPath(selectedGame(games, id).coverPath);
  }, [games]);

  if (changes) {
    return (
      <Grid container className={classes.root} spacing={3}>
        <Grid xs={3} item>
          <img className={classes.cover} src={coverPath}></img>
          <FormControl fullWidth className={classes.textField}>
            <InputLabel>Цена</InputLabel>
            <Input
              value={price}
              onChange={() => {}}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
          <FormControl fullWidth className={classes.textField}>
            <InputLabel>Скидка</InputLabel>
            <Input
              value={discount}
              onChange={() => {}}
              startAdornment={
                <InputAdornment position="start">%</InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid xs={8} item>
          <Grid container>
            <Grid item xs={11}>
              <TextField
                value={name}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(v): void => {}}
              />
            </Grid>
            <Grid item container xs={1} alignContent="center">
              <Grid item xs={6}>
                <IconButton onClick={() => setChanges(false)}>
                  <CloseIcon />
                </IconButton>
              </Grid>
              <Grid item xs={6}>
                <IconButton color="primary" onClick={() => setChanges(false)}>
                  <CheckIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Rating
            name="simple-controlled"
            value={1}
            size="large"
            onChange={(event, newValue) => {
              // setValue(newValue);
            }}
          />
          <h3>Описание</h3>
          <TextField
            fullWidth
            multiline
            variant="outlined"
            value={description}
            onChange={() => {}}
          />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container className={classes.root} spacing={3}>
      <Grid xs={3} item>
        <img className={classes.cover} src={coverPath}></img>
        <h3>${price}</h3>
        {AuthInfo.isAuth ? (
          <>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={() => {
                addGameToBasket(selectedGame(games, id));
              }}
            >
              В корзину
            </Button>
            <Button variant="contained" color="secondary">
              Купить
            </Button>
          </>
        ) : (
          <>Авторизуйтесь для совершения покупок</>
        )}
      </Grid>
      <Grid xs={8} item>
        <Grid container>
          <Grid item xs={11}>
            <h2>{name}</h2>
          </Grid>
          <Grid item container xs={1} alignContent="center">
            <Grid item>
              {AuthInfo.isAuth && AuthInfo.role === "admin" && (
                <IconButton onClick={() => setChanges(true)}>
                  <SettingsIcon />
                </IconButton>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Rating
          name="simple-controlled"
          value={1}
          size="large"
          onChange={(event, newValue) => {
            // setValue(newValue);
          }}
        />
        <h3>Описание</h3>
        <Typography>{description}</Typography>
      </Grid>
    </Grid>
  );
});

export default GamePage;
