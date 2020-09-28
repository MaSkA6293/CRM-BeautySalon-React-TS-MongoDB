import React from "react";
import "./styles.scss";
import "react-datepicker/dist/react-datepicker.css";
import NavItem from "./components/NavItem";
import { faUsers, faList } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import HomeHeader from "./components/HomeHeader";
const Home = () => {
  return (
    <div className="Home">
      <HomeHeader />
      <div className="Home__menu">
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
    </div>
  );
};

export default Home;
