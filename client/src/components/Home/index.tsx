import React from "react";
import "./styles.scss";
import Label from "./Label/Label";
import "react-datepicker/dist/react-datepicker.css";
import NavItem from "./NavItem/NavItem";

import { bindActionCreators } from "redux";
import { changeDate } from "../../actions/actionCreator";
import { connect } from "react-redux";

import {
  faUserCog,
  faChartPie,
  faUsers,
  faGlobeAfrica,
  faCogs,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="Home">
      <Label title="Beauty Slon" addClass={["Home__Label"]} />
      <nav>
        <ul>
          <Link to="/clients">
            <NavItem
              icon={faUsers}
              title={"Клиенты"}
              addClass={["Home__NavItem"]}
            />
          </Link>
          <Link to="/jornal">
            <NavItem
              icon={faGlobeAfrica}
              title={"Журнал"}
              addClass={["Home__NavItem"]}
            />
          </Link>
          <NavItem
            icon={faChartPie}
            title={"Статистика"}
            addClass={["Home__NavItem"]}
          />

          <NavItem
            icon={faUserCog}
            title={"Персонал"}
            addClass={["Home__NavItem"]}
          />

          <Link to="/services">
            <NavItem
              icon={faList}
              title={"Услуги"}
              addClass={["Home__NavItem"]}
            />
          </Link>

          <NavItem
            icon={faCogs}
            title={"Настройки"}
            addClass={["Home__NavItem"]}
          />
          <NavItem
            icon={faCogs}
            title={"Настройки"}
            addClass={["Home__NavItem"]}
          />
          <NavItem
            icon={faCogs}
            title={"Настройки"}
            addClass={["Home__NavItem"]}
          />
        </ul>
      </nav>
    </div>
  );
};

function mapStateToProps(store: any) {
  return {
    date: store.app.date,
  };
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      changeDate,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
