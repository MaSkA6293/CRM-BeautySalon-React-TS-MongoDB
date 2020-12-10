import React from "react";
import { itemCategoriesListPlusColor } from "../../../../ducks/categories/selector";
import Category from "../Category";
interface ICategoryList {
    categoryList: itemCategoriesListPlusColor[];
    setOpenEdit: (value: boolean) => void;
    setSelectedCategory: (data: itemCategoriesListPlusColor) => void;
}

export default function CategoriesList({
    categoryList,
    setOpenEdit,
    setSelectedCategory,
}: ICategoryList): React.ReactElement {
    return (
        <div className="categories-list">
            {categoryList.map((item: itemCategoriesListPlusColor, index: number) => {
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
