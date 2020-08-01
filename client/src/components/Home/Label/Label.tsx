import React from "react";
import "./Label.scss";
import classNames from "classnames";

type LabelProps = {
  title: string;
  addClass?: string[];
};

const Label = ({ title, addClass }: LabelProps) => {
  return (
    <div className={classNames("Label", addClass)}>
      <h1>{title}</h1>
    </div>
  );
};

export default Label;
