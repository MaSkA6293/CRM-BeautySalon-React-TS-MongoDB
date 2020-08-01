import React from "react";
import "./Services.scss";
import Header from "../Header";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { IService } from "../../types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";

type ServicesProps = {
  services: IService;
};

const Services = ({ services }: any) => {
  return (
    <>
      <div className="addService">
        <FontAwesomeIcon icon={faPlus} />
      </div>
      <div className="Services">
        <Header addClass="Services__header" />

        <table className="PriceTable">
          {services.map((service: any, index: number) => {
            return [
              <thead>
                <tr className="PriceTable__row">
                  <td className="PriceTable__nameGroup" key={index}>
                    {service.name}
                  </td>{" "}
                  <td></td>{" "}
                  <td className="PriceTable__icon">
                    <FontAwesomeIcon icon={faEdit} />
                  </td>
                </tr>{" "}
              </thead>,
              <tbody>
                {service.list.map((item: any, index: number) => {
                  return [
                    <tr>
                      <td key={index} className="PriceTable__nameGroupItem">
                        {item.name}
                      </td>{" "}
                      <td className="PriceTable__priceGroupItem">
                        {item.price}&#8381;
                      </td>
                      <td className="PriceTable__icon">
                        <FontAwesomeIcon icon={faEdit} />
                      </td>
                    </tr>,
                  ];
                })}
              </tbody>,
            ];
          })}
        </table>
      </div>
    </>
  );
};

function mapStateToProps(store: any) {
  return {
    services: store.services,
  };
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Services);
