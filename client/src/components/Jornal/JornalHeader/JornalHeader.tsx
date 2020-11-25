import React from "react";
import "./JornalHeader.scss";

import Button from "./Button/Button";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { faCaretRight, faCaretLeft, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { nextDate, prevDate, changeDate } from "../../../actions/actionCreator";

type JornalHeaderProps = {
    date: Date;
    changeDate: (date: Date) => void;
};

const JornalHeader = ({ date, changeDate }: JornalHeaderProps) => {
    const Left = <FontAwesomeIcon icon={faCaretLeft} />;
    const Right = <FontAwesomeIcon icon={faCaretRight} />;
    const options = {
        month: "long",
        day: "numeric",
        weekday: "long",
    };
    const handlerClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void = (e) => {
        const targetVale = e.currentTarget.dataset.value;
        switch (targetVale) {
            case "Left":
                changeDate(new Date(date.setDate(date.getDate() - 1)));
                break;
            case "Right":
                changeDate(new Date(date.setDate(date.getDate() + 1)));
                break;
            case "Now":
                changeDate(new Date());
                break;
            default:
        }
    };

    return (
        <div className="JornalHeader">
            <div className="JornalHeader__row">
                <FontAwesomeIcon
                    icon={faCalendarAlt}
                    size="2x"
                    color="#071f3a"
                    style={{ margin: "0 5px", cursor: "pointer" }}
                />
                <div className="filterDays JornalHeader__filterDays">
                    {/* <Button
                        children={"День"}
                        onClick={handlerClick}
                        data={"day"}
                        addClass={["filterDays__item"]}
                    ></Button>
                    <Button
                        children={"Неделя"}
                        onClick={handlerClick}
                        data={"week"}
                        addClass={["filterDays__item"]}
                    ></Button>
                    <Button
                        children={"Месяц"}
                        onClick={handlerClick}
                        data={"month"}
                        addClass={["filterDays__item"]}
                    ></Button> */}
                </div>
            </div>
            <div className="JornalHeader__row JornalHeader__row-position">
                <Button
                    // eslint-disable-next-line react/no-children-prop
                    children={Left}
                    onClick={handlerClick}
                    data={"Left"}
                    addClass={["JornalHeader__navButton"]}
                ></Button>
                <div className="JornalHeader__date">{date.toLocaleString("ru", options)}</div>
                <Button
                    // eslint-disable-next-line react/no-children-prop
                    children={Right}
                    onClick={handlerClick}
                    data={"Right"}
                    addClass={["JornalHeader__navButton"]}
                ></Button>
            </div>
        </div>
    );
};

function mapStateToProps(store: any) {
    return {
        date: store.stateApp.date,
    };
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators(
        {
            nextDate,
            prevDate,
            changeDate,
        },
        dispatch,
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(JornalHeader);
