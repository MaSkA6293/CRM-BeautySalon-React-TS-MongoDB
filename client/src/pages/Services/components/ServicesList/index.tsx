import React, { useEffect } from "react";
import "./Services.scss";

import { useSelector, useDispatch } from "react-redux";
import { IGlobalStore } from "../.,/../../../../reducers/rootReducer";

import ServicesHeader from "../ServicesHeader";
import { getColors } from "../../actions/actionsServices";
const ServicesList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getColors());
  }, []);

  const { services } = useSelector(({ services }: IGlobalStore) => {
    return {
      services: services.servicesList,
    };
  });
  return (
    <div className="Services">
      <ServicesHeader services={services} />
    </div>
  );
};

export default ServicesList;
