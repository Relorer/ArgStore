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
  import FiltersLeftMenu from "../FiltersLeftMenu";
  import GameListPage from "./GameListPage";
  import FiltersTopMenu from "../FiltersTopMenu";
  import { observer } from "mobx-react";
  import { GamesServiceContext } from "../../services/GamesServiceProvider";
  import { Game } from "../../models/ApiModel";
  import { useParams } from "react-router";
  import TextField from "@material-ui/core/TextField";
  
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
        margin: "10px",
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
  
    let { id } = useParams<{ id: string }>();
  
    const selectedGame = (games: Game[], id: string) => {
      let def: Game = {
        id: "0",
        name: "",
        description: "",
        price: 0,
        priceIncludingDiscount: 0,
        coverPath: "",
        releaseDate: new Date(),
        rating: undefined,
        comments: undefined,
        genres: undefined,
      };
      return games.find((element) => element.id === id) || def;
    };
  
    const [name, setName] = useState(selectedGame(games, (id)).name);
    const [description, setDescription] = useState(
      selectedGame(games, (id)).description
    );
    const [price, setPrice] = useState(selectedGame(games, (id)).price);
    const [priceIncludingDiscount, setPriceIncludingDiscount] = useState(
      selectedGame(games, (id)).priceIncludingDiscount
    );
    const [coverPath, setCoverPath] = useState(
      selectedGame(games, (id)).coverPath
    );
  
    useEffect(() => {
      refreshGames();
    }, []);
  
    useEffect(() => {
      setName(selectedGame(games, (id)).name);
      setDescription(selectedGame(games, (id)).description);
      setPrice(selectedGame(games, (id)).price);
      setPriceIncludingDiscount(
        selectedGame(games, (id)).priceIncludingDiscount
      );
      setCoverPath(selectedGame(games, (id)).coverPath);
    }, [games]);
  
    return (
      <div className={classes.root}>
        <TextField
          label="Name"
          className={classes.textField}
          value={name}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(v) => setName(v.target.value)}
        />
        <TextField
          label="Description"
          value={description}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(v) => setDescription(v.target.value)}
        />
        <TextField
          label="Price"
          type="number"
          className={classes.textField}
          value={price}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(v: any) => setPrice(v.target.value)}
        />
        <TextField
          label="Price Including Discount"
          type="number"
          className={classes.textField}
          value={priceIncludingDiscount}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(v: any) => setPriceIncludingDiscount(v.target.value)}
        />
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={() => {
            remove(selectedGame(games, (id)));
            document.location.replace("/");
          }}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => {
            let game = selectedGame(games, (id));
            let _game: Game = {
              id: game.id,
              name: name,
              description: description,
              price: price,
              priceIncludingDiscount: priceIncludingDiscount,
              coverPath: coverPath,
              releaseDate: game.releaseDate,
              rating: undefined,
              comments: undefined,
              genres: undefined,
            };
            update(_game);
          }}
        >
          Save
        </Button>
      </div>
    );
  });
  
  export default GamePage;
  