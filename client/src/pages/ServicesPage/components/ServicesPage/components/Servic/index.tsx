import React from "react";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import "./styles.scss";

import ListItem from "@material-ui/core/ListItem";
import { ISelectServicesToShow } from "../../../../../../ducks/services/selector";

interface IService {
    key: number;
    servic: ISelectServicesToShow;
    setOpenEdit: (val: boolean) => void;
    setSelectedServic: (data: ISelectServicesToShow) => void;
}

export default function Servic({ servic, setOpenEdit, setSelectedServic }: IService): React.ReactElement {
    const handlerClick = (data: ISelectServicesToShow) => {
        setOpenEdit(true);
        setSelectedServic(data);
    };
    return (
        <ListItem button style={{ padding: "0px 5px" }} onClick={() => handlerClick(servic)}>
            <div className="servic">
                <div className="servic__body">
                    <div className="servic__icon">
                        <FormatListBulletedIcon style={{ fontSize: 30 }} />
                    </div>
                    <div className="servic__main">
                        <div className="servic__title">
                            <div className="servic__color" style={{ backgroundColor: servic.color.hex }}></div>
                            <div className="servic__name">{servic.name}</div>
                        </div>
                        <div className="servic__footer">
                            Время:{servic.duration[0] > 0 ? `${servic.duration[0]} ч` : ""}{" "}
                            {servic.duration[1] > 0 ? `${servic.duration[1]} мин` : ""}; Стоимость:
                            {servic.cost}
                        </div>
                    </div>
                </div>
                <div className="servic__categories-colors categories-colors">
                    {servic.categoryColor.map((el: string | undefined, index: number) => {
                        return (
                            <div className="categories-colors__item" style={{ backgroundColor: el }} key={index}></div>
                        );
                    })}
                </div>
            </div>
        </ListItem>
    );
}
