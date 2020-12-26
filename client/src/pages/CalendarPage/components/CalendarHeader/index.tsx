import React from "react";
import { useHistory } from "react-router-dom";
import "./styles.scss";
import Header from "../../../../components/Header";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

export const CalendarHeader: React.FC = (): React.ReactElement => {
    const history = useHistory();
    return (
        <Header>
            <div className="clients-header">
                <Tooltip title="Назад">
                    <Button color="secondary" onClick={history.goBack}>
                        <ArrowBackIcon style={{ color: "white" }} />
                    </Button>
                </Tooltip>
                <span className="clients-header__title">Календарь</span>
            </div>
        </Header>
    );
};
