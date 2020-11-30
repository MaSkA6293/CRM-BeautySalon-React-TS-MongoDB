import React, { useEffect, useState } from "react";
import "./Services.scss";
import cogoToast from "cogo-toast";
import { useSelector, useDispatch } from "react-redux";

import Spiner from "../../../../components/Spiner";
import ServicesHeader from "../ServicesHeader";
import { runFetchServicesPage } from "../../../../ducks/services/actionCreators/servicesPageFetch";
import ServicList from "../ServiceList";
import ModalEditService from "../ModalEditServic";
import {
    selectServicesMessageError,
    selectServicesIsFetching,
    selectServicesList,
} from "../../../../ducks/services/selector";
import { selectColorsList } from "../../../../ducks/colors/selector";
import { selectCategoryesList } from "../../../../ducks/categories/selector";

const ServicesPage: React.FC = (): React.ReactElement => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(runFetchServicesPage());
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

    const messageError = useSelector(selectServicesMessageError);
    const colors = useSelector(selectColorsList);
    const categories = useSelector(selectCategoryesList);
    const servicesIsFetching = useSelector(selectServicesIsFetching);
    const services = useSelector(selectServicesList).filter((el: any) => {
        if (filter === "all") {
            return el;
        }
        return el.categoriesId.includes(filter);
    });

    useEffect(() => {
        messageError && cogoToast.error(<div className="message">{messageError}</div>);
    }, [messageError]);

    return (
        <div className="services">
            <ServicesHeader categoryList={categories} filter={filter} setFilter={setFilter} />
            {servicesIsFetching ? <Spiner /> : ""}
            {services.length > 0 && colors.length && (
                <ServicList servicesList={services} setOpenEdit={setOpenEdit} setSelectedServic={setSelectedServic} />
            )}
            <ModalEditService
                open={openEdit}
                handleClose={() => setOpenEdit(false)}
                selectedServic={selectedServic}
                categoryList={categories}
            />
        </div>
    );
};
export default ServicesPage;
