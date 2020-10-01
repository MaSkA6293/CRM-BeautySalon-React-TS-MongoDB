import React from "react";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import "./styles.scss";

import ListItem from "@material-ui/core/ListItem";
type ServiceProps = {
  key: number;
  data: {
    id: string;
    name: string;
    duration: number[];
    cost: number;
    color: string;
    categoryColor: string[];
  };
};
export default function Servic({ data }: ServiceProps) {
  return (
    <ListItem button style={{ padding: "0px 5px" }}>
      <div className="servic">
        <div className="servic__body">
          <div className="servic__icon">
            <FormatListBulletedIcon style={{ fontSize: 30 }} />
          </div>
          <div className="servic__main">
            <div className="servic__title">
              <div
                className="servic__color"
                style={{ backgroundColor: data.color }}
              ></div>
              <div className="servic__name">{data.name}</div>
            </div>
            <div className="servic__footer">
              Время:{data.duration[0] > 0 ? `${data.duration[0]} ч` : ""}{" "}
              {data.duration[1] > 0 ? `${data.duration[1]} мин` : ""};
              Стоимость:
              {data.cost}
            </div>
          </div>
        </div>
        <div className="servic__categories-colors categories-colors">
          {data.categoryColor.map((el, index) => {
            return (
              <div
                className="categories-colors__item"
                style={{ backgroundColor: el }}
                key={index}
              ></div>
            );
          })}
        </div>
      </div>
    </ListItem>
  );
}
