import React from "react";

import Button from "@material-ui/core/Button";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  button: {
    color: "#fff",
  },
  icon: {
    fontSize: "1.8rem",
  },
});

type AddNewServiceProps = {
  isOpen: Boolean;
  setIsOpen: (value: boolean) => void;
};

const AddNewService = ({ isOpen, setIsOpen }: AddNewServiceProps) => {
  const classes = useStyles();
  return (
    <div className="ServicesHeader__Category" onClick={() => setIsOpen(true)}>
      <Button className={classes.button}>
        <PostAddIcon className={classes.icon} />
      </Button>
    </div>
  );
};

export default AddNewService;
