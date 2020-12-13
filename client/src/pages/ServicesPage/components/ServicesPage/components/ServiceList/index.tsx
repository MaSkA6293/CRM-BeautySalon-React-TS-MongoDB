import React from "react";
import Servic from "../Servic";
import { ISelectServicesToShow } from "../../../../../../ducks/services/selector";
interface IServiceList {
    servicesList: ISelectServicesToShow[];
    setOpenEdit: (val: boolean) => void;
    setSelectedServic: (data: ISelectServicesToShow) => void;
}

export default function ServiceList({
    servicesList,
    setOpenEdit,
    setSelectedServic,
}: IServiceList): React.ReactElement {
    return (
        <div className="servic-list">
            {servicesList.map((item: ISelectServicesToShow, index: number) => {
                return (
                    <Servic key={index} servic={item} setOpenEdit={setOpenEdit} setSelectedServic={setSelectedServic} />
                );
            })}
        </div>
    );
}
