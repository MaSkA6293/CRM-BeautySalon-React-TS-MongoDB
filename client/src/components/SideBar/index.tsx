import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

import List from "@material-ui/core/List";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { Link } from "react-router-dom";

import PeopleIcon from "@material-ui/icons/People";
import StorageIcon from "@material-ui/icons/Storage";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import ExtensionIcon from "@material-ui/icons/Extension";
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});
type HeaderProps = {
  isOpenBar: boolean;
  setIsOpen: (value: boolean) => void;
};

const Header = ({ isOpenBar, setIsOpen }: HeaderProps) => {
  const classes = useStyles();

  const toggleDrawer = () => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setIsOpen(false);
  };

  const list = () => {
    return (
      <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer()}
        onKeyDown={toggleDrawer()}
      >
        <List>
          <Link to="/clients">
            <ListItem button selected={true}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Клиенты" />
            </ListItem>
          </Link>
          <Link to="/services">
            <ListItem button>
              <ListItemIcon>
                <StorageIcon />
              </ListItemIcon>
              <ListItemText primary="Услуги" />
            </ListItem>
          </Link>
          <Link to="/jornal">
            <ListItem button>
              <ListItemIcon>
                <PlaylistAddCheckIcon />
              </ListItemIcon>
              <ListItemText primary="Журнал" />
            </ListItem>
          </Link>
          <Link to="/test">
            <ListItem button>
              <ListItemIcon>
                <ExtensionIcon />
              </ListItemIcon>
              <ListItemText primary="Тест" />
            </ListItem>
          </Link>
        </List>
      </div>
    );
  };

  return (
    <div>
      {/* <Button onClick={toggleDrawer(true)}>"My button"</Button> */}
      <Drawer open={isOpenBar} onClose={toggleDrawer()}>
        {list()}
      </Drawer>
    </div>
  );
};
export default Header;
