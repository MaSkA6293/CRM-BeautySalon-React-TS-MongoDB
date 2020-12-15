import React from "react";

import Button from "@material-ui/core/Button";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
const useStyles = makeStyles({
    button: {
        color: "#fff",
    },
    icon: {
        fontSize: "1.8rem",
    },
});

interface IAddNewService {
    setIsOpen: (value: boolean) => void;
}

const AddNewService = ({ setIsOpen }: IAddNewService): React.ReactElement => {
    const classes = useStyles();
    return (
        <div className="ServicesHeader__Category" onClick={() => setIsOpen(true)}>
            <Tooltip title="Добавить услугу">
                <Button className={classes.button}>
                    <PostAddIcon className={classes.icon} />
                </Button>
            </Tooltip>
        </div>
    );
};

export default AddNewService;
