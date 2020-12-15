import React from "react";
import { useHistory } from "react-router-dom";
import "./styles.scss";
import Header from "../../../../components/Header";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Tooltip from "@material-ui/core/Tooltip";

interface ClientHeaderProps {
    setAddIsOpen: (value: boolean) => void;
}

export const ClientsHeader: React.FC<ClientHeaderProps> = ({ setAddIsOpen }: ClientHeaderProps): React.ReactElement => {
    const history = useHistory();
    return (
        <Header>
            <div className="clients-header">
                <Tooltip title="Назад">
                    <Button color="secondary" onClick={history.goBack}>
                        <ArrowBackIcon style={{ color: "white" }} />
                    </Button>
                </Tooltip>
                <span className="clients-header__title">Клиенты</span>
                <Tooltip title="Добавить клиента">
                    <Button color="secondary" onClick={() => setAddIsOpen(true)}>
                        <PersonAddIcon style={{ color: "white" }} />
                    </Button>
                </Tooltip>
            </div>
        </Header>
    );
};
