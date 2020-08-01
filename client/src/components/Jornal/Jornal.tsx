import React from "react";
import "./Jornal.scss";
import Header from "../Header";
import JornalHeader from "./JornalHeader/JornalHeader";
import Content from "./Content/Content";

const Jornal = () => {
  return (
    <div className="Jornal">
      <Header children={<JornalHeader />} addClass={"Jornal__header"} />
      <Content />
    </div>
  );
};

export default Jornal;
