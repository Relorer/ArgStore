import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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

export default function GameCard() {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardContent>
                    <img
                        className={classes.cover}
                        src="https://store-images.s-microsoft.com/image/apps.1547.14585440003614248.9f7109bf-73f7-4bc7-ba61-1eeb006d905a.75930d81-6e85-436d-9b61-1279b8dd9b31"
                    ></img>
                    <Typography className={classes.title}>
            Assassin's Creed® Valhalla
                    </Typography>
                    <Typography>$59.99</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
