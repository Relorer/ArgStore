import {
    Container,
    createStyles,
    Grid,
    makeStyles,
    Theme,
} from "@material-ui/core";
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import FiltersLeftMenu from "../FiltersLeftMenu";
import GameList from "../GameList";
import FiltersTopMenu from "../FiltersTopMenu";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
    })
);

export default function GameCustomizable() {
    const classes = useStyles();

    return <div>Dick</div>;
}
