import React from "react";
import "./Button.scss";
import classNames from "classnames";
interface IButton {
    children?: any;
    onClick: any;
    data: string;
    addClass?: string[];
}

const Button = ({ children, onClick, data, addClass }: IButton) => {
    return (
        <div className={classNames("Button", addClass)} onClick={onClick} data-value={data}>
            {children}
        </div>
    );
};

export default Button;
