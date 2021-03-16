import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    button: {
      display: "block",
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    input: {
      border: "none",
      "&:focus": {
        boxShadow: "none",
      },
    },
  })
);

function ListItemLink(props: ListItemProps<"a", { button?: true }>) {
  return <ListItem button component="a" {...props} />;
}

export default function FiltersTopMenu() {
  const classes = useStyles();
  const [age, setAge] = React.useState<string | number>("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as number);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      Сортировать:
      <FormControl className={classes.formControl}>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={10}
          onChange={handleChange}
        >
          <MenuItem value={10}>Дата выпуска</MenuItem>
          <MenuItem value={20}>Название A-Z</MenuItem>
          <MenuItem value={30}>Название Z-A</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
