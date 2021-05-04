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
import { GamesService } from "../../services/GamesService";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

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
            margin: "4px 10px 4px 0",
        },
    })
);

const GamePage = observer(() => {
    const classes = useStyles();
    const { id } = useParams<{ id: string }>();

    const { games, update, remove, refreshGames } = useContext(
        GamesServiceContext
    ) as GamesService;

    const { AuthInfo, addGameToBasket } = useContext(
        UserServiceContext
    ) as UserService;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [cover, setCover] = useState("");
    const [changes, setChanges] = useState(false);

    useEffect(() => refreshGames(), []);

    const selectedGame = (games: Game[], id: string) => {
        const def: Game = {
            id: "0",
            name: "",
            description: "",
            price: 0,
            discount: 0,
            cover: "",
            releaseDate: new Date(),
            rating: undefined,
            comments: undefined,
            genres: undefined,
        };
        return games.find((element) => element.id === id) || def;
    };

    const setDefaulValues = () => {
        const game = selectedGame(games, id);
        setName(game.name);
        setDescription(game.description);
        setPrice(game.price);
        setDiscount(game.discount);
        setCover(game.cover);
    };

    useEffect(() => setDefaulValues(), [games]);

    const getBase64 = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setCover(reader.result);
        };
    };

    if (changes) {
        return (
            <Grid container className={classes.root} spacing={3}>
                <Grid xs={3} item>
                    <img
                        className={classes.cover}
                        src={cover !== "" ? cover : "/images/notfound.png"}
                    ></img>

                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        style={{ display: "none" }}
                        id="fileinput"
                        onChange={async (e) => {
                            const files = e.target.files;
                            if (files && files.length > 0) {
                                const file = files[0];
                                getBase64(file);
                            }
                        }}
                    />
                    <Button
                        className={classes.button}
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => {
              document?.getElementById("fileinput")?.click();
                        }}
                    >
            Загрузить обложку
                    </Button>

                    <FormControl fullWidth className={classes.textField}>
                        <InputLabel>Цена</InputLabel>
                        <Input
                            value={price}
                            type="number"
                            onChange={(v): void => setPrice(v.target.value)}
                            startAdornment={
                                <InputAdornment position="start">$</InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl fullWidth className={classes.textField}>
                        <InputLabel>Скидка</InputLabel>
                        <Input
                            value={discount}
                            type="number"
                            onChange={(v): void => setDiscount(v.target.value)}
                            startAdornment={
                                <InputAdornment position="start">%</InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid>
                <Grid xs={8} item>
                    <Grid container>
                        <Grid item xs={10}>
                            <TextField
                                value={name}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(v): void => setName(v.target.value)}
                            />
                        </Grid>
                        <Grid item container xs={2}>
                            <Grid item xs={4}>
                                <IconButton
                                    onClick={() => {
                                        setDefaulValues();
                                        setChanges(false);
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={4}>
                                <IconButton
                                    color="secondary"
                                    onClick={() => {
                                        remove(selectedGame(games, id));
                                        document.location.href = "/";
                                    }}
                                >
                                    <DeleteForeverIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={4}>
                                <IconButton
                                    color="primary"
                                    onClick={() => {
                                        const game = selectedGame(games, id);
                                        game.id = id;
                                        game.name = name;
                                        game.description = description;
                                        game.cover = cover;
                                        game.discount = discount;
                                        game.price = price;
                                        update(game);
                                        setChanges(false);
                                    }}
                                >
                                    <CheckIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <h3>Описание</h3>
                    <TextField
                        fullWidth
                        multiline
                        variant="outlined"
                        value={description}
                        onChange={(v): void => setDescription(v.target.value)}
                    />
                </Grid>
            </Grid>
        );
    }

    return (
        <Grid container className={classes.root} spacing={3}>
            <Grid xs={3} item>
                <img
                    className={classes.cover}
                    src={cover !== "" ? cover : "/images/notfound.png"}
                ></img>
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
                        <Button variant="contained" color="secondary" href="/purchase">
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
