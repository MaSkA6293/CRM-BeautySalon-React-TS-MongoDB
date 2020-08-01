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
    <li className={classNames("NavItem", addClass)}>
      <FontAwesomeIcon icon={icon} />
      <h2>{title}</h2>
    </li>
  );
};

export default NavItem;
