import React from "react";

import { useHistory } from "react-router-dom";
import "./styles.scss";
import Header from "../../../../components/Header";

import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

type ServicesHeaderProps = {
    openAddCategory: (value: boolean) => void;
};

const CategoryHeader = ({ openAddCategory }: ServicesHeaderProps): React.ReactElement => {
    const history = useHistory();

    return (
        <Header>
            <div className="category-header">
                <Button color="secondary" onClick={history.goBack}>
                    <ArrowBackIcon style={{ color: "white" }} />
                </Button>
                <div className="category-header__title">Категории услуг</div>
                <div className="category-header__add" onClick={() => openAddCategory(true)}>
                    <Button>
                        <PlaylistAddIcon />
                    </Button>
                </div>
            </div>
        </Header>
    );
};

export default CategoryHeader;
