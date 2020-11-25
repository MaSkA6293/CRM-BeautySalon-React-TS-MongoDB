import React from "react";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { runSignOut } from "../../../../ducks/user/sagas/signOut";
import { useDispatch } from "react-redux";

type HeaderMenuProps = {
    handleClose: () => void;
    anchorEl: null | HTMLElement;
};
const HeaderMenu = ({ handleClose, anchorEl }: HeaderMenuProps) => {
    const dispatch = useDispatch();
    return (
        <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={() => dispatch(runSignOut())}>Выйти</MenuItem>
        </Menu>
    );
};
export default HeaderMenu;
