import React, { useState } from "react";

import Header from "../../../../components/Header";
import CategoryHeader from "../CategoryHeader";
import ModalAddNewCategory from "../FormAddNewCategory";
type CategoryListProps = {};

const CategoryList = () => {
  const [isOpenAddCategory, setIsOpenAddCategory] = useState(true);
  return (
    <div className="CategoryList">
      dsfsdfsd
      <Header>
        <CategoryHeader openAddCategory={() => setIsOpenAddCategory(true)} />
      </Header>
      {isOpenAddCategory ? (
        <ModalAddNewCategory
          isOpen={isOpenAddCategory}
          closeModal={() => setIsOpenAddCategory(false)}
        />
      ) : (
        ""
      )}
    </div>
  );
};
export default CategoryList;
