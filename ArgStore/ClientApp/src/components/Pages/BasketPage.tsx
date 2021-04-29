import {
    Box,
    Button,
    createStyles,
    Grid,
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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: "20px 0 0 0",
        },
        leftCol: {},
        rigtCol: {},
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

const BasketPage = observer(() => {
    const classes = useStyles();

    return <></>;
});

export default BasketPage;
