import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import "./styles.scss";
import Header from "../../../../components/Header";

import SettingsIcon from "@material-ui/icons/Settings";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import AddNewService from "../AddNewService";
import ModalAddService from "../ModalAddNewService";
import { ICategory } from "../../types";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
const useStyles = makeStyles({
    root: {
        color: "#fff",
        fontSize: "1.1rem",
        width: "90%",
        margin: "0 5%",
    },
    icon: {
        fontSize: "1.8rem",
        color: "white",
    },
    input: {
        borderBlockColor: "#fff",
    },
});

type ServicesHeaderProps = {
    categoryList: ICategory[];
    filter: string;
    setFilter: (value: string) => void;
};

const ServicesHeader = ({ categoryList, setFilter, filter }: ServicesHeaderProps) => {
    const [isOpenAddService, setIsOpenAddService] = useState(false);

    const classes = useStyles();
    const history = useHistory();

    const handlerClickGoCategiry = () => {
        history.push("services/categories");
    };

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFilter(event.target.value as string);
    };

    return (
        <Header>
            <div className="services-header">
                <Button color="secondary" onClick={history.goBack}>
                    <ArrowBackIcon style={{ color: "white" }} />
                </Button>

                <div className="services-header__filter">
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
                        {categoryList &&
                            categoryList.map((item: ICategory, index: number) => {
                                return (
                                    <MenuItem key={index} value={item._id}>
                                        {" "}
                                        {item.name}
                                    </MenuItem>
                                );
                            })}
                    </Select>
                </div>
                <AddNewService setIsOpen={setIsOpenAddService} />
                <div className="services-header__category" onClick={() => handlerClickGoCategiry()}>
                    <Button>
                        <SettingsIcon className={classes.icon} />
                    </Button>
                </div>
            </div>
            <ModalAddService
                open={isOpenAddService}
                handleClose={() => setIsOpenAddService(false)}
                categoryList={categoryList}
            />
        </Header>
    );
};

export default ServicesHeader;
