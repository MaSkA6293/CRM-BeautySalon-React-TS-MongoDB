import React from "react";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import "./styles.scss";
import { itemCategoriesListPlusColor } from "../../../../../../ducks/categories/selector";
import ListItem from "@material-ui/core/ListItem";

type ServiceProps = {
    key: number;
    data: itemCategoriesListPlusColor;
    setOpenEdit: (value: boolean) => void;
    setSelectedCategory: (data: itemCategoriesListPlusColor) => void;
};

export default function Category({ data, setOpenEdit, setSelectedCategory }: ServiceProps): React.ReactElement {
    const handlerClick = (data: itemCategoriesListPlusColor) => {
        setOpenEdit(true);
        setSelectedCategory(data);
    };
    return (
        <ListItem button style={{ padding: "0px 5px" }} onClick={() => handlerClick(data)}>
            <div className="category">
                <div className="category__body">
                    <div className="category__icon">
                        <FormatListBulletedIcon style={{ fontSize: 30 }} />
                    </div>
                    <div className="category__main">
                        <div className="category__title">
                            <div
                                className="category__color"
                                style={{ backgroundColor: data.color?.hex ? data.color.hex : "black" }}
                            ></div>
                            <div className="category__name">{data.name}</div>
                        </div>
                    </div>
                </div>
            </div>
        </ListItem>
    );
}
