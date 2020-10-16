import React, {useState} from "react";
import "./styles.scss";
import Header from ".././.././../../components/Header";
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from "@material-ui/core/Typography";
import HeaderMenu from "../HomeHeaderMenu"

const HomeHeader = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event:React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <Header>
      <div className="HomeHeader">
        <div className="HomeHeader__label">
          <Typography variant="h4" component="h1">
            Beauty Servise
        </Typography>
        </div>
        <div className="HomeHeader__menu">
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
     <AccountCircle color={"secondary"} fontSize={"large"} />
         </Button>
         <HeaderMenu handleClose={handleClose} anchorEl={anchorEl}/>
        </div>

      </div>
    </Header>
  );
};

export default HomeHeader;
