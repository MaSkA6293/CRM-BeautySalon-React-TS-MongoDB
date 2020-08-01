import React from "react";
import "./ContentItem.scss";

type ContentItemProps = {
  time: string;
  addNewWrite: (e: React.SyntheticEvent<HTMLDivElement>) => void;
};

const ContentItem = ({ time, addNewWrite }: ContentItemProps) => {
  return (
    <div className="ContentItem" onClick={(e) => addNewWrite(e)}>
      <span>{time}</span>
    </div>
  );
};

export default ContentItem;
