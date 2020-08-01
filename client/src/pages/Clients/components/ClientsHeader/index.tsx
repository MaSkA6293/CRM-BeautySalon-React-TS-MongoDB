import React from "react";

import { useHistory } from "react-router-dom";
import "./styles.scss";
import Header from "../../../../components/Header";
import { faUserPlus, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import CustomIcon from "../../../../components/CustomIcon";

type ClientHeaderProps = {
  setAddIsOpen: (value: boolean) => void;
};

const ClientsHeader = ({ setAddIsOpen }: ClientHeaderProps) => {
  let history = useHistory();
  const handlerClickGoHome = () => {
    history.push("/");
  };

  return (
    <Header>
      <div className="ClientsHeader">
        <CustomIcon
          addClass={["ClientsHeader__arrowBack"]}
          click={() => handlerClickGoHome()}
          icon={faArrowLeft}
        />

        <div className="ClientsHeader__title">Клиенты</div>

        <CustomIcon
          addClass={["ClientsHeader__addUser"]}
          click={() => setAddIsOpen(true)}
          icon={faUserPlus}
        />
      </div>
    </Header>
  );
};

export default ClientsHeader;
