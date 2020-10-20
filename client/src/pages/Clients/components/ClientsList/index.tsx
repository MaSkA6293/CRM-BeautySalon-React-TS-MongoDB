import React from "react";
import MenuItemClient from "../../components/MenuItemClient";
import "react-dropdown/style.css";
import "./styles.scss";
import { IClient } from "../../../../types/typesClients";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

type ClientsListProps = {
  clients: IClient[];
  edit: (id: number) => void;
};

export const ClientsList = ({ clients, edit }: ClientsListProps) => {
  const options = [
    {
      label: "Отправить всем SMS",
      function: (id: number, cb: () => void) => {
        cb();
      },
    },
    {
      label: "Отправить всем email",
      function: (id: number, cb: () => void) => {
        cb();
      },
    },
    {
      label: "Редактировать клиента",
      function: (id: number, cb: () => void) => {
        cb();
        edit(id);
      },
    },
  ];
  return (
    <div className="clients-list">
      <List component="nav" aria-label="main mailbox folders">
        {clients.map((client: any) => {
          return (
            <ListItem
              key={client._id}
              alignItems="center"
              button
              className="clients-list__item"
            >
              <Avatar
                style={{
                  backgroundColor: client.color ? client.color : "#9e51b0",
                }}
                className="clients-list__avatar"
              >
                {client.name[0]}
              </Avatar>
              <div className="clients-list__client">
                <div className="clients-list__name-and-surname">
                  {`${client.name} ${client.surname} `}
                </div>
                <div className="clients-list__phone">
                  {" "}
                  <FontAwesomeIcon icon={faPhoneAlt} />
                  {` ${client.phone}`}
                </div>
              </div>{" "}
              <MenuItemClient
                options={options}
                id={client._id}
                addClass={"clients-list__icon"}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};
