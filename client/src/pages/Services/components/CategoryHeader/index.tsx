import React from "react";

import { useHistory } from "react-router-dom";
import "./styles.scss";
import Header from "../../../../components/Header";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import CustomIcon from "../../../../components/CustomIcon";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    root: {
        color: "#fff",
        margin: "0 5%",
        fontSize: "1.3rem",
    },
    button: {
        color: "#fff",
    },
    input: {
        borderBlockColor: "#fff",
    },
});

type ServicesHeaderProps = {
    openAddCategory: (value: boolean) => void;
};

const CategoryHeader = ({ openAddCategory }: ServicesHeaderProps): React.ReactElement => {
    const classes = useStyles();
    const history = useHistory();
    const handlerClickGoHome = () => {
        history.push("/services");
    };

    return (
        <Header>
            <div className="category-header">
                <Button className={classes.button}>
                    <CustomIcon
                        addClass={["category-header__arrow-back"]}
                        click={() => handlerClickGoHome()}
                        icon={faArrowLeft}
                    />
                </Button>
                <div className="category-header__title">Категории услуг</div>
                <div className="category-header__add" onClick={() => openAddCategory(true)}>
                    <Button className={classes.button}>
                        <PlaylistAddIcon />
                    </Button>
                </div>
            </div>
        </Header>
    );
};

export default CategoryHeader;
