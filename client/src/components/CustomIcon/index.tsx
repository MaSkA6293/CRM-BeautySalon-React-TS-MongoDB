import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type IconAddProps = {
  addClass: string[];
  click: () => void;
  icon: any;
};
const CustomIcon = ({ addClass, click, icon }: IconAddProps) => {
  return (
    <div className={classNames(...addClass)} onClick={click}>
      <FontAwesomeIcon icon={icon} />
    </div>
  );
};

export default CustomIcon;
