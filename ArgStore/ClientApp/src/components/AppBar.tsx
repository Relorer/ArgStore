import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import {
    createStyles,
    fade,
    Theme,
    makeStyles,
} from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { Badge, Button, Link } from "@material-ui/core";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { getAuthInfo, signout } from "../api/Auth";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            display: "none",
            [theme.breakpoints.up("sm")]: {
                display: "block",
            },
        },
        button: {
            color: "white",
        },
        search: {
            position: "relative",
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            "&:hover": {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: "100%",
            [theme.breakpoints.up("sm")]: {
                marginLeft: theme.spacing(1),
                width: "auto",
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: "100%",
            position: "absolute",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        input: {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create("width"),
            width: "100%",
            [theme.breakpoints.up("sm")]: {
                width: "12ch",
                "&:focus": {
                    width: "20ch",
                },
            },
        },
    })
);

export default function SearchAppBar() {
    const classes = useStyles();
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState<string | null>(null);

    const checkAuth = async (): Promise<void> => {
        const res = await getAuthInfo();
        setIsAuth(res.isAuth);
        console.log(res);
        if (res.isAuth) setUser(res.user.userName);
    };
    checkAuth();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Link
                        className={classes.title}
                        color="inherit"
                        variant="h6"
                        noWrap
                        underline="none"
                        href="./"
                    >
            ArgStore
                    </Link>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                input: classes.input,
                            }}
                            inputProps={{ "aria-label": "search" }}
                        />
                    </div>
                    <IconButton aria-label="show 4 new mails" color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <ShoppingBasketIcon />
                        </Badge>
                    </IconButton>

                    {isAuth ? (
                        <>
                            <Typography>{user}</Typography>
                            <Button
                                className={classes.button}
                                onClick={async (): Promise<void> => {
                                    await signout();
                                    await checkAuth();
                                }}
                            >
                Signout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                className={classes.button}
                                onClick={(): void => {
                                    document.location.href = document.location.href + "signin";
                                }}
                            >
                Login
                            </Button>
                            <Button
                                className={classes.button}
                                onClick={(): void => {
                                    document.location.href = document.location.href + "signup";
                                }}
                            >
                Signup
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
