import React from "react";

import { useHistory } from "react-router-dom";
import "./styles.scss";
import Header from "../../../../components/Header";
import { faEdit, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import InputLabel from "@material-ui/core/InputLabel";
import CustomIcon from "../../../../components/CustomIcon";
import CategoryIcon from "@material-ui/icons/Category";
import Select from "@material-ui/core/Select";

import MenuItem from "@material-ui/core/MenuItem";
type ServicesHeaderProps = {
  services: any;
};

const ServicesHeader = ({ services }: ServicesHeaderProps) => {
  let history = useHistory();
  const handlerClickGoHome = () => {
    history.push("/");
  };

  const [filter, setFilter] = React.useState("all");
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilter(event.target.value as string);
  };

  return (
    <Header>
      <div className="ServicesHeader">
        <CustomIcon
          addClass={["ServicesHeader__arrowBack"]}
          click={() => handlerClickGoHome()}
          icon={faArrowLeft}
        />

        <div className="ServicesHeader__title">Услуги</div>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter}
          onChange={handleChange}
        >
          <MenuItem value="all">Все услуги</MenuItem>
          {services.map((item: any, index: number) => {
            return (
              <MenuItem key={index} value={item.id}>
                {" "}
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
        <div className="ServicesHeader__addCategory">
          <CategoryIcon onClick={() => {}} />
        </div>
      </div>
    </Header>
  );
};

export default ServicesHeader;
