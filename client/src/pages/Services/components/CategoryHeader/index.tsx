import React from "react";

import { useHistory } from "react-router-dom";
import "./styles.scss";
import Header from "../../../../components/Header";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import CustomIcon from "../../../../components/CustomIcon";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    color: "#fff",
    margin: "0 5%",
    fontSize: "1.3rem",
  },
  button: {
    color: "#fff",
  },
  input: {
    borderBlockColor: "#fff",
  },
});

type ServicesHeaderProps = {
  openAddCategory: (value: boolean) => void;
};

const CategoryHeader = ({ openAddCategory }: ServicesHeaderProps) => {
  const classes = useStyles();
  let history = useHistory();
  const handlerClickGoHome = () => {
    history.push("/services");
  };

  return (
    <Header>
      <div className="CategoryHeader">
        <Button className={classes.button}>
          <CustomIcon
            addClass={["CategoryHeader__arrowBack"]}
            click={() => handlerClickGoHome()}
            icon={faArrowLeft}
          />
        </Button>
        <div className="CategoryHeader__title">Категории услуг</div>
        <div
          className="CategoryHeader__add"
          onClick={() => openAddCategory(true)}
        >
          <Button className={classes.button}>
            <PlaylistAddIcon />
          </Button>
        </div>
      </div>
    </Header>
  );
};

export default CategoryHeader;
