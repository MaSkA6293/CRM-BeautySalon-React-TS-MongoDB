import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import Header from "../../../../components/Header";
import CategoryHeader from "../CategoryHeader";
import ModalAddNewCategory from "../ModalAddNewCategory";

import { getColors } from "../../actions/actionsServices";
import { getCategories } from "../../actions/actionsServices";
import { ICategory } from "../../types";
import { IGlobalStore } from "../../../../reducers/rootReducer";
import CategoryList from "../CategoryList";
import ModalEditCategory from "../ModalEditCatrgory";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getColors());
    dispatch(getCategories());
  }, [dispatch]);

  const initialCategory = {
    _id: "1",
    name: "test name",
    color: { _id: "12345", hex: "red" },
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
              (el) => el._id.toString() === item.colorId
            )!,
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

      {categoryList.length > 0 && colors.length && (
        <CategoryList
          categoryList={categoryList}
          setOpenEdit={setOpenEdit}
          setSelectedCategory={setSelectedCategory}
        />
      )}
      <ModalEditCategory
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        selectedCategory={selectedCategory}
        categoryList={categoryList}
      />
    </div>
  );
};
export default CategoriesPage;
