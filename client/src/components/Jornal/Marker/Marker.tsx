import React from "react";

import "./Marker.scss";

type MarkerProps = {
    color: string;
    addclass: string;
    onClick: any;
};

const Marker = ({ color, addclass, onClick }: MarkerProps) => {
    return <div className={addclass} style={{ backgroundColor: color }} onClick={onClick} />;
};

export default Marker;
