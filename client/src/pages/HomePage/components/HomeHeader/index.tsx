import React from "react";
import "./styles.scss";
import Header from ".././.././../../components/Header";

import Typography from "@material-ui/core/Typography";
const HomeHeader = () => {
  return (
    <Header>
      <div className="HomeHeader">
        <Typography variant="h4" component="h1">
          Beauty Servise
        </Typography>
        {/* <div className="HomeHeader__label">Beauty Servise</div> */}
      </div>
    </Header>
  );
};

export default HomeHeader;
