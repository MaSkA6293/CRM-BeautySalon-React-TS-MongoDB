import React, { useState } from "react";
import "./styles.scss";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

type itemMenu = {
    label: string;
    function: (id: string, cb: () => void) => void;
};
interface IMenu {
    options: itemMenu[];
    id: string;
}

export const MenuItemClient: React.FC<IMenu> = ({ options, id }: IMenu): React.ReactElement => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MoreVertIcon />
            </Button>

            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
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
