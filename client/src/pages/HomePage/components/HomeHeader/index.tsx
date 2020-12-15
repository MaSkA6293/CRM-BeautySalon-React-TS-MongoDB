import React, { useState } from "react";
import "./styles.scss";
import Header from ".././.././../../components/Header";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import HeaderMenu from "../HomeHeaderMenu";
import { Tooltip } from "@material-ui/core";

const HomeHeader: React.FC = (): React.ReactElement => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Header>
            <div className="home-header">
                <span className="home-header__label">Beauty Servise</span>
                <div className="home-header__menu">
                    <Tooltip title="Настройки">
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            <div className="home-header__icon-menu">
                                <AccountCircle color={"secondary"} fontSize={"inherit"} />
                            </div>
                        </Button>
                    </Tooltip>
                    <HeaderMenu handleClose={handleClose} anchorEl={anchorEl} />
                </div>
            </div>
        </Header>
    );
};

export default HomeHeader;
