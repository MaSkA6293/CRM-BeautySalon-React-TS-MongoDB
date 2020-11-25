import React from "react";
import "./NavItem.scss";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type MenuItemType = {
    icon: any;
    title: string;
    addClass: string[];
};

const NavItem = ({ icon, title, addClass }: MenuItemType) => {
    return (
        <div className={classNames("nav-item", addClass)}>
            <div className="nav-item__icon">
                <FontAwesomeIcon icon={icon} />
            </div>
            <span className="nav-item__title">{title}</span>
        </div>
    );
};

export default NavItem;
