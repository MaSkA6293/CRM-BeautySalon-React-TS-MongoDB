import React, { useEffect, useState } from "react";
import "./Services.scss";
import cogoToast from "cogo-toast";
import { useSelector, useDispatch } from "react-redux";
import { IGlobalStore } from "../../../../reducers/rootReducer";
import Spiner from "../../../../components/Spiner";
import ServicesHeader from "../ServicesHeader";
import { servicPageRequest } from "../../../../sagas/pageServices/fetchServicePageData";
import ServicList from "../ServiceList";
import { IService } from "../../types";
import ModalEditService from "../ModalEditServic";
const ServicesPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(servicPageRequest());
    }, [dispatch]);
    const initialSelectedServic = {
        _id: "1",
        name: "default",
        duration: ["1", "0"],
        cost: 1,
        color: { _id: "12345", hex: "red" },
        categoriesId: ["1", "2"],
    };

    const [openEdit, setOpenEdit] = useState(false);
    const [selectedServic, setSelectedServic] = useState(initialSelectedServic);
    const [filter, setFilter] = useState("all");
    const { servicesList, colors, categoryList, servicePageRequest, serviceMessageFail } = useSelector(
        ({ services, colors }: IGlobalStore) => {
            return {
                serviceMessageFail: services.serviceMessageFail,
                servicePageRequest: services.servicePageRequest,
                servicesList: services.servicesList
                    .filter((el: any) => {
                        if (filter === "all") {
                            return el;
                        }
                        return el.categoriesId.includes(filter);
                    })
                    .map((item: IService) => {
                        return {
                            _id: item._id,
                            name: item.name,
                            duration: item.duration,
                            cost: item.cost,
                            color: {
                                hex: colors.colorsList.find((el) => el._id.toString() === item.colorId)?.hex,
                                _id: item.colorId,
                            },
                            categoryColor: item.categoriesId.map((id) => {
                                const colorId = services.categoryList.find((el) => el._id === id)?.colorId;
                                return colors.colorsList.find((el) => el._id.toString() === colorId)?.hex;
                            }),
                            categoriesId: item.categoriesId,
                        };
                    }),
                colors: colors.colorsList,
                categoryList: services.categoryList,
            };
        },
    );
    useEffect(() => {
        serviceMessageFail && cogoToast.error(<div className="message">{serviceMessageFail}</div>);
    }, [serviceMessageFail]);

    return (
        <div className="services">
            <ServicesHeader categoryList={categoryList} filter={filter} setFilter={setFilter} />
            {servicePageRequest ? <Spiner /> : ""}
            {servicesList.length > 0 && colors.length && (
                <ServicList
                    servicesList={servicesList}
                    setOpenEdit={setOpenEdit}
                    setSelectedServic={setSelectedServic}
                />
            )}
            <ModalEditService
                open={openEdit}
                handleClose={() => setOpenEdit(false)}
                selectedServic={selectedServic}
                categoryList={categoryList}
            />
        </div>
    );
};
export default ServicesPage;
