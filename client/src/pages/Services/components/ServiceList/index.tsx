import React from "react";
import Servic from "../Servic";

type ServiceListProps = {
    servicesList: any;
    setOpenEdit: any;
    setSelectedServic: any;
};
export default function ServiceList({ servicesList, setOpenEdit, setSelectedServic }: ServiceListProps) {
    return (
        <div className="servic-list">
            {servicesList.map((item: any, index: number) => {
                return (
                    <Servic
                        key={index}
                        data={{
                            _id: item._id,
                            name: item.name,
                            duration: item.duration,
                            cost: item.cost,
                            color: item.color,
                            categoryColor: item.categoryColor,
                            categoriesId: item.categoriesId,
                        }}
                        setOpenEdit={setOpenEdit}
                        setSelectedServic={setSelectedServic}
                    />
                );
            })}
        </div>
    );
}
