import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import { FormControlLabel, Slider } from "@material-ui/core";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "250px",
            background: "white",
            marginTop: "25px",
        },
        dataSlider: {
            margin: "10px 0 ",
        },
    })
);

function ListItemLink(props: ListItemProps<"a", { button?: true }>) {
    return <ListItem button component="a" {...props} />;
}

export default function FiltersLeftMenu() {
    const classes = useStyles();
    const [value, setValue] = React.useState<number[]>([20, 37]);

    return (
        <div className={classes.root}>
            <div>Дата выхода: 2005 - 2021г.</div>
            <Slider
                className={classes.dataSlider}
                value={value}
                onChange={() => {}}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={() => ""}
            />
            <div>Цена: 30 - 100$</div>
            <Slider
                className={classes.dataSlider}
                value={value}
                onChange={() => {}}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={() => ""}
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={false}
                        onChange={() => {}}
                        name="checkedB"
                        color="primary"
                    />
                }
                label="Игры со скидкой"
            />
        </div>
    );
}
