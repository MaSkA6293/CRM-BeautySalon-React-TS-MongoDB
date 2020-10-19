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
      <div className="clients-header">
        <CustomIcon
          addClass={["clients-header__arrow-back"]}
          click={() => handlerClickGoHome()}
          icon={faArrowLeft}
        />
        <span className="clients-header__title">Клиенты</span>
        <CustomIcon
          addClass={["clients-header__add-user"]}
          click={() => setAddIsOpen(true)}
          icon={faUserPlus}
        />
      </div>
    </Header>
  );
};

export default ClientsHeader;
