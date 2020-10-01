import React, { useEffect } from "react";
import "./Services.scss";

import { useSelector, useDispatch } from "react-redux";
import { IGlobalStore } from "../.,/../../../../reducers/rootReducer";

import ServicesHeader from "../ServicesHeader";
import { getColors, getServices } from "../../actions/actionsServices";
import Servic from "../Servic";
import { IService } from "../../types";
const ServicesList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getColors());
    dispatch(getServices());
  }, [dispatch]);
  const { servicesList, colors, categoryList } = useSelector(
    ({ services, colors }: IGlobalStore) => {
      return {
        servicesList: services.servicesList,
        colors: colors.colorsList,
        categoryList: services.categoryList,
      };
    }
  );

  return (
    <div className="Services">
      <ServicesHeader servicesList={servicesList} />
      <div className="servic-list">
        {servicesList.length > 0 && colors
          ? servicesList.map((item: IService, index: number) => {
              return (
                <Servic
                  key={index}
                  data={{
                    id: item._id,
                    name: item.name,
                    duration: item.duration,
                    cost: item.cost,
                    color: colors.find(
                      (el) => el._id.toString() === item.colorId
                    )?.hex!,
                    categoryColor: item.categoriesId.map((id) => {
                      const colorId = categoryList.find((el) => el._id === id)
                        ?.colorId;
                      return colors.find((el) => el._id.toString() === colorId)
                        ?.hex!;
                    }),
                  }}
                />
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default ServicesList;
