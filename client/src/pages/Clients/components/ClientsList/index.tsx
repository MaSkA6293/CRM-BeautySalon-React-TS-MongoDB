import React from "react";
import { MenuItemClient } from "../../components";
import "react-dropdown/style.css";
import "./styles.scss";
import { IClient } from "../../../../ducks/clients/contracts/state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

interface IClientsList {
    clients: IClient[];
    edit: (id: number) => void;
}

export const ClientsList: React.FC<IClientsList> = ({ clients, edit }: IClientsList): React.ReactElement => {
    const options = [
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
                {clients.map((client: IClient) => {
                    return (
                        <ListItem
                            key={client._id}
                            alignItems="center"
                            button
                            style={{ borderBottom: "2px solid #c5c5c5" }}
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
                            <MenuItemClient options={options} id={client._id} />
                        </ListItem>
                    );
                })}
            </List>
        </div>
    );
};
