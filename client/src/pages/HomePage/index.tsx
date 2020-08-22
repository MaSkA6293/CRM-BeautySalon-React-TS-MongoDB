import React from "react";
import "./styles.scss";
import Label from "./components/Label";
import "react-datepicker/dist/react-datepicker.css";
import NavItem from "./components/NavItem";
import { faUsers, faList } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";

const Home = () => {
  return (
    <div className="Home">
      <Label title="Beauty Slon" addClass={["Home__Label"]} />
      <Link to="/clients">
        <ListItem button>
          <NavItem
            icon={faUsers}
            title={"Клиенты"}
            addClass={["Home__NavItem"]}
          />
        </ListItem>
      </Link>
      <Link to="/services">
        <ListItem button>
          <NavItem
            icon={faList}
            title={"Услуги"}
            addClass={["Home__NavItem"]}
          />
        </ListItem>
      </Link>
    </div>
  );
};

export default Home;
