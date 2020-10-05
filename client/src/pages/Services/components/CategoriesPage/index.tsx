import React, { useState } from "react";

import Header from "../../../../components/Header";
import CategoryHeader from "../CategoryHeader";
import ModalAddNewCategory from "../FormAddNewCategory";
type CategoryListProps = {};

const CategoriesPage = () => {
  const [isOpenAddCategory, setIsOpenAddCategory] = useState(false);
  return (
    <div className="CategoryList">
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
export default CategoriesPage;