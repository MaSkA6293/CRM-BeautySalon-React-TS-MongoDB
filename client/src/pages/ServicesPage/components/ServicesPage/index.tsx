import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./Services.scss";

import Spiner from "../../../../components/Spiner";
import ServicesHeader from "./components/ServicesHeader";
import { runFetchServicesPage } from "../../../../ducks/services/actionCreators/servicesPageFetch";
import ServicList from "./components/ServiceList";
import ModalEditService from "./components/ModalEditServic";
import {
    selectServicesMessageError,
    selectServicesIsFetching,
    selectServicesList,
    ISelectServicesToShow,
    selectServicesMessageSuccess,
    selectServicesServiceIsAdding,
    selectServicesServiceIsEditing,
    selectServicesServiceIsDeleting,
} from "../../../../ducks/services/selector";
import Message from "../../../../components/Message";
import { selectColorsList } from "../../../../ducks/colors/selector";
import { selectCategoriesList } from "../../../../ducks/categories/selector";

const ServicesPage: React.FC = (): React.ReactElement => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(runFetchServicesPage());
    }, [dispatch]);

    const initialSelectedServic: ISelectServicesToShow = {
        _id: "1",
        name: "default",
        duration: [1, 0],
        cost: 1,
        color: { _id: "12345", hex: "red" },
        categoriesId: ["1", "2"],
        categoryColor: [],
    };

    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [selectedServic, setSelectedServic] = useState<ISelectServicesToShow>(initialSelectedServic);
    const [filter, setFilter] = useState("all");

    const messageError = useSelector(selectServicesMessageError);
    const messageSuccess = useSelector(selectServicesMessageSuccess);
    const colors = useSelector(selectColorsList);
    const categories = useSelector(selectCategoriesList);
    const servicesIsFetching = useSelector(selectServicesIsFetching);
    const services = useSelector(selectServicesList).filter((el: ISelectServicesToShow) => {
        if (filter === "all") {
            return el;
        }
        return el.categoriesId.includes(filter);
    });

    const serviceIsAdding = useSelector(selectServicesServiceIsAdding);
    const serviceIsEditing = useSelector(selectServicesServiceIsEditing);
    const serviceIsDeleting = useSelector(selectServicesServiceIsDeleting);
    if (servicesIsFetching) {
        return <Spiner />;
    }
    return (
        <>
            {messageSuccess && <Message isOpen status={"success"} message={messageSuccess} />}{" "}
            {messageError && <Message isOpen status={"error"} message={messageError} />}
            <div className="services">
                <ServicesHeader
                    colors={colors}
                    categoryList={categories}
                    filter={filter}
                    setFilter={setFilter}
                    isAdding={serviceIsAdding}
                />
                {services.length > 0 && colors.length > 0 && (
                    <ServicList
                        servicesList={services}
                        setOpenEdit={setOpenEdit}
                        setSelectedServic={setSelectedServic}
                    />
                )}
                <ModalEditService
                    open={openEdit}
                    handleClose={() => setOpenEdit(false)}
                    selectedServic={selectedServic}
                    categoryList={categories}
                    colors={colors}
                    isEditing={serviceIsEditing}
                    isDeleting={serviceIsDeleting}
                />
            </div>
        </>
    );
};
export default ServicesPage;
