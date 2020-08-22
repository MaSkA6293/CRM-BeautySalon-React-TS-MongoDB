import React from "react";
import "./Services.scss";

import { useSelector } from "react-redux";
import { IGlobalStore } from "../.,/../../../../reducers/rootReducer";

import ServicesHeader from "../ServicesHeader";

const ServicesList = () => {
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
