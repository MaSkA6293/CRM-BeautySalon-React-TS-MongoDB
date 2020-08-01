import React from "react";
import MenuItemClient from "../../components/MenuItemClient";
import "react-dropdown/style.css";
import { IClient } from "../../../../types/typesClients";
import "./styles.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import Avatar from "@material-ui/core/Avatar";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import classNames from "classnames";

type ClientsListProps = {
  clients: IClient[];
  edit: (id: number) => void;
};

export const ClientsList = ({ clients, edit }: ClientsListProps) => {
  const options = [
    {
      label: "Отправить всем SMS",
      function: (id: number, cb: () => void) => {
        console.log(id);
        cb();
      },
    },
    {
      label: "Отправить всем email",
      function: (id: number, cb: () => void) => {
        console.log(id);
        cb();
      },
    },
    {
      label: "Редактировать клиента",
      function: (id: number, cb: () => void) => {
        console.log(id);
        cb();
        edit(id);
      },
    },
  ];

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
    })
  );

  const classes = useStyles();

  return (
    <div className={classNames(classes.root, "ClientsList")}>
      <List component="nav" aria-label="main mailbox folders">
        {clients.map((client: IClient) => {
          return (
            <ListItem key={client._id} alignItems="center" button>
              <Avatar style={{ backgroundColor: "#9e51b0" }}>
                {client.name[0]}
              </Avatar>
              <div className="ClientsList__client">
                <div className="ClientsList__nameFamale">
                  {`${client.name} ${client.female} `}
                </div>
                <div className="ClientsList__phone">
                  {" "}
                  <FontAwesomeIcon icon={faPhoneAlt} />
                  {` ${client.phone}`}
                </div>
              </div>{" "}
              <MenuItemClient
                options={options}
                id={client._id}
                addClass={"ClientsList__icon"}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};
