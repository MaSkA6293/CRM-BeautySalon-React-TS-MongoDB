import React, { useEffect, useState } from "react";
import "./Services.scss";

import { useSelector, useDispatch } from "react-redux";
import { IGlobalStore } from "../../../../reducers/rootReducer";

import ServicesHeader from "../ServicesHeader";
import {
  getCategories,
  getColors,
  getServices,
} from "../../actions/actionsServices";
import ServicList from "../ServiceList";
import { IService } from "../../types";
import ModalEditService from "../ModalEditServic";
const ServicesPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getColors());
    dispatch(getServices());
    dispatch(getCategories());
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
  const { servicesList, colors, categoryList } = useSelector(
    ({ services, colors }: IGlobalStore) => {
      return {
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
                hex: colors.colorsList.find(
                  (el) => el._id.toString() === item.colorId
                )?.hex!,
                _id: item.colorId,
              },
              categoryColor: item.categoriesId.map((id) => {
                const colorId = services.categoryList.find(
                  (el) => el._id === id
                )?.colorId;
                return colors.colorsList.find(
                  (el) => el._id.toString() === colorId
                )?.hex!;
              }),
              categoriesId: item.categoriesId,
            };
          }),
        colors: colors.colorsList,
        categoryList: services.categoryList,
      };
    }
  );
  return (
    <div className="services">
      <ServicesHeader
        categoryList={categoryList}
        filter={filter}
        setFilter={setFilter}
      />
      {servicesList.length > 0 && colors && (
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
