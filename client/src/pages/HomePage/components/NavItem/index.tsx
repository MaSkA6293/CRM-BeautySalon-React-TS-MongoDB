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
    <div className={classNames("NavItem", addClass)}>
      <FontAwesomeIcon icon={icon} />
      <h2>{title}</h2>
    </div>
  );
};

export default NavItem;
