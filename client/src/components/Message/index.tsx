import React, { useState } from "react";
import "./styles.scss";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

type MessageProps = {
  message: string;
  status: boolean;
};

const Message = ({ message, status }: MessageProps) => {
  const [open, setOpen] = useState(true);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {status ? (
          <Alert onClose={handleClose} severity="success">
            {message}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error">
            {message}
          </Alert>
        )}
      </Snackbar>
    </>
  );
};
export default Message;
