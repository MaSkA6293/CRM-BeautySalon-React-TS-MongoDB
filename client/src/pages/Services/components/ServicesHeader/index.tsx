import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import "./styles.scss";
import Header from "../../../../components/Header";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import CustomIcon from "../../../../components/CustomIcon";
import PostAddIcon from "@material-ui/icons/PostAdd";
import SettingsIcon from "@material-ui/icons/Settings";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles({
  root: {
    color: "#fff",
    fontSize: "1.3rem",
    width: "90%",
    margin: "0 5%",
  },
  button: {
    color: "#fff",
  },
  icon: {
    fontSize: "1.8rem",
  },
  input: {
    borderBlockColor: "#fff",
  },
});

type ServicesHeaderProps = {
  services: any;
};

const ServicesHeader = ({ services }: ServicesHeaderProps) => {
  const classes = useStyles();
  let history = useHistory();
  const handlerClickGoHome = () => {
    history.push("/");
  };
  const handlerClickGoCategiry = () => {
    history.push("services/category");
  };

  const [filter, setFilter] = useState("all");
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilter(event.target.value as string);
  };

  return (
    <Header>
      <div className="ServicesHeader">
        <Button className={classes.button}>
          <CustomIcon
            addClass={["ServicesHeader__arrowBack"]}
            click={() => handlerClickGoHome()}
            icon={faArrowLeft}
          />
        </Button>
        <div className="ServicesHeader__filter">
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            onChange={handleChange}
            className={classes.root}
          >
            <MenuItem value="all" className={classes.input}>
              Все услуги
            </MenuItem>
            {services.map((item: any, index: number) => {
              return (
                <MenuItem key={index} value={item.id}>
                  {" "}
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <div
          className="ServicesHeader__Category"
          onClick={() => handlerClickGoCategiry()}
        >
          <Button className={classes.button}>
            <PostAddIcon className={classes.icon} />
          </Button>
        </div>
        <div
          className="ServicesHeader__Category"
          onClick={() => handlerClickGoCategiry()}
        >
          <Button className={classes.button}>
            <SettingsIcon className={classes.icon} />
          </Button>
        </div>
      </div>
    </Header>
  );
};

export default ServicesHeader;
