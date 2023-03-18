import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function DrawerMenu(props) {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <List dense disablePadding sx={{ margin: 0, width: "250px" }}>
      {props.navLinks.map((el, index) => (
        <ListItem key={el.name} disablePadding>
          <ListItemButton
            variant="contained"
            disableGutters
            dense
            disablePadding
          >
            <a href={el.path}>{el.name}</a>
            <ListItemIcon>
              <NavigateNextIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <div>
      <Button
        onClick={toggleDrawer("left", true)}
        variant="contained"
        disableElevation
        style={{ height: "100%" }}
      >
        Menu
      </Button>
      <Drawer
        anchor={"left"}
        open={state["left"]}
        variant="temporary"
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </div>
  );
}
