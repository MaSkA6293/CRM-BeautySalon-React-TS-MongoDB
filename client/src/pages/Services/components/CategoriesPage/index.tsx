import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import Header from "../../../../components/Header";
import CategoryHeader from "../CategoryHeader";
import ModalAddNewCategory from "../ModalAddNewCategory";

import { getColors } from "../../actions/actionsServices";
import { getCategories } from "../../actions/actionsServices";
import { ICategory } from "../../types";
import { IColor } from "../../../../types/typesColors";
import { IGlobalStore } from "../../../../reducers/rootReducer";
import CategoryList from "../CategoryList";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getColors());
    dispatch(getCategories());
  }, [dispatch]);

  const initialCategory = {
    _id: "1",
    name: "test name",
    colorId: "1",
  };
  const [isOpenAddCategory, setIsOpenAddCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const [openEdit, setOpenEdit] = useState(false);
  const { categoryList, colors } = useSelector(
    ({ services, colors }: IGlobalStore) => {
      return {
        categoryList: services.categoryList.map((item: ICategory) => {
          return {
            _id: item._id,
            name: item.name,
            color: colors.colorsList.find(
              (el: IColor) => el._id === item.colorId
            )?.hex!,
          };
        }),
        colors: colors.colorsList,
      };
    }
  );

  return (
    <div className="categories">
      <Header>
        <CategoryHeader openAddCategory={() => setIsOpenAddCategory(true)} />
      </Header>
      {isOpenAddCategory ? (
        <ModalAddNewCategory
          open={isOpenAddCategory}
          handleClose={() => setIsOpenAddCategory(false)}
        />
      ) : (
        ""
      )}

      {CategoryList.length > 0 && colors && (
        <CategoryList
          categoryList={categoryList}
          setOpenEdit={setOpenEdit}
          setSelectedCategory={setSelectedCategory}
        />
      )}
    </div>
  );
};
export default CategoriesPage;
