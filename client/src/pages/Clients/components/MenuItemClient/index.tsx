import React, { useState } from "react";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

type itemMenu = {
  label: string;
  function: (id: number, cb: () => void) => void;
};
type MenuProps = {
  options: itemMenu[];
  id: number;
  addClass?: string;
};

const MenuItemClient = ({ options, id, addClass }: MenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ height: "100" }}
        className={addClass}
      >
        <FontAwesomeIcon icon={faEllipsisV} style={{ fontSize: "1.5rem" }} />
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((o, index) => {
          return (
            <MenuItem key={index} onClick={() => o.function(id, handleClose)}>
              {" "}
              {o.label}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default MenuItemClient;
