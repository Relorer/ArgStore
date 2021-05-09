import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { FC } from "react";

import { Game } from "../models/ApiModel";

const useStyles = makeStyles({
    root: {
        width: 240,
        height: "100%",
        boxShadow: "none",
        background: "transparent",
    },
    fullHeight: {
        height: "100%",
    },
    cardContentContainer: {},
    title: {
        fontSize: 16,
    },
    cover: {
        width: "100%",
        height: "280px",
        objectFit: "cover",
    },
});

type GameCardProps = {
  game: Game;
};

const GameCard: FC<GameCardProps> = ({ game }) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardActionArea href={game.id} className={classes.fullHeight}>
                <CardContent className={classes.fullHeight}>
                    <Grid
                        container
                        className={[classes.fullHeight, classes.cardContentContainer]}
                    >
                        <Grid item xs={12}>
                            <img
                                className={classes.cover}
                                src={game.cover !== "" ? game.cover : "/images/notfound.png"}
                            />
                            <Typography className={classes.title}>{game.name}</Typography>
                            <Typography>${game.price}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default GameCard;
