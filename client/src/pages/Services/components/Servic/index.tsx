import React from "react";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import "./styles.scss";

import ListItem from "@material-ui/core/ListItem";
import { IColor } from "../../../../types/typesColors";
type ServiceProps = {
    key: number;
    data: {
        _id: string;
        name: string;
        duration: number[];
        cost: number;
        color: IColor;
        categoryColor: string[];
        categoriesId: string[];
    };
    setOpenEdit: any;
    setSelectedServic: any;
};

export default function Servic({ data, setOpenEdit, setSelectedServic }: ServiceProps) {
    const handlerClick = (data: {
        _id: string;
        name: string;
        duration: number[];
        cost: number;
        color: IColor;
        categoryColor: string[];
        categoriesId: string[];
    }) => {
        setOpenEdit(true);
        setSelectedServic(data);
    };
    return (
        <ListItem button style={{ padding: "0px 5px" }} onClick={() => handlerClick(data)}>
            <div className="servic">
                <div className="servic__body">
                    <div className="servic__icon">
                        <FormatListBulletedIcon style={{ fontSize: 30 }} />
                    </div>
                    <div className="servic__main">
                        <div className="servic__title">
                            <div className="servic__color" style={{ backgroundColor: data.color.hex }}></div>
                            <div className="servic__name">{data.name}</div>
                        </div>
                        <div className="servic__footer">
                            Время:{data.duration[0] > 0 ? `${data.duration[0]} ч` : ""}{" "}
                            {data.duration[1] > 0 ? `${data.duration[1]} мин` : ""}; Стоимость:
                            {data.cost}
                        </div>
                    </div>
                </div>
                <div className="servic__categories-colors categories-colors">
                    {data.categoryColor.map((el, index) => {
                        return (
                            <div className="categories-colors__item" style={{ backgroundColor: el }} key={index}></div>
                        );
                    })}
                </div>
            </div>
        </ListItem>
    );
}
