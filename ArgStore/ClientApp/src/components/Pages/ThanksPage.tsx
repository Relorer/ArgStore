import { createStyles, Link, makeStyles, Theme } from "@material-ui/core";
import { observer } from "mobx-react";
import React, { useContext, useEffect, useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: "20px 0 0 0",
        },
        textField: {
            margin: "0 20px",
            boxSizing: "border-box",
        },
        cover: {
            width: "100%",
        },
        button: {
            margin: "0 10px 0 0",
        },
        formControl: {
            minWidth: 200,
        },
        divider: {},
    })
);

const ThanksPage = observer(() => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h2>Уважаемый покупатель!</h2>
            <p>Преобретенные ключи были отправлены на ваш email.</p>
            <p style={{ color: "#777" }}>
        Спасибо за покупку!
                <br />С уважением, администрация <Link href="/">ArgStore</Link>.
            </p>
        </div>
    );
});

export default ThanksPage;
