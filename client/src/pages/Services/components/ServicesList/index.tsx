import React from "react";
import "./Services.scss";

import { IService } from "../../types";

import { useSelector } from "react-redux";
import { IGlobalStore } from "../.,/../../../../reducers/rootReducer";

import ServicesHeader from "../ServicesHeader";
type ServicesProps = {
  services: IService;
};

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
