import React from "react";
import { IColor } from "../../../../ducks/colors/contracts/state";
import Category from "../Category";
type CategoryListProps = {
    categoryList: {
        _id: string;
        name: string;
        color: IColor;
    }[];
    setOpenEdit: any;
    setSelectedCategory: any;
};
export default function ServiceList({ categoryList, setOpenEdit, setSelectedCategory }: CategoryListProps) {
    return (
        <div className="categories-list">
            {categoryList.map((item: any, index: number) => {
                return (
                    <Category
                        key={index}
                        data={{
                            _id: item._id,
                            name: item.name,
                            color: item.color,
                        }}
                        setOpenEdit={setOpenEdit}
                        setSelectedCategory={setSelectedCategory}
                    />
                );
            })}
        </div>
    );
}
