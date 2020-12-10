import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/Header";
import CategoryHeader from "./components/CategoryHeader";
import ModalAddNewCategory from "./components/ModalAddNewCategory";

import { runCategoriesPageFetch } from "../../ducks/categories/actionCreators/fetchCategoriesPage";

import CategoryList from "./components/CategoryList";
import ModalEditCategory from "./components/ModalEditCatrgory";
import { selectColorsList } from "../../ducks/colors/selector";
import {
    selectCategoriesListAndColor,
    selectCategoriesIsFetching,
    selectCategoryesMessageError,
    selectCategoryesMessageSuccess,
    itemCategoriesListPlusColor,
    selectCategoryIsAdding,
    selectCategoryIsEditing,
    selectCategoryIsDeleting,
} from "../../ducks/categories/selector";
import Message from "../../components/Message";
import Spiner from "../../components/Spiner";

const CategoriesPage: React.FC = (): React.ReactElement => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(runCategoriesPageFetch());
    }, [dispatch]);

    const initialCategory = {
        _id: "1",
        name: "test name",
        color: { _id: "12345", hex: "red" },
    };
    const [isOpenAddCategory, setIsOpenAddCategory] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<itemCategoriesListPlusColor>(initialCategory);
    const [openEdit, setOpenEdit] = useState(false);
    const colors = useSelector(selectColorsList);
    const categoriesList = useSelector(selectCategoriesListAndColor);
    const categoriesIsFetching = useSelector(selectCategoriesIsFetching);
    const messageSuccess = useSelector(selectCategoryesMessageSuccess);
    const messageError = useSelector(selectCategoryesMessageError);
    const categoryIsAdding = useSelector(selectCategoryIsAdding);
    const categoryIsEditing = useSelector(selectCategoryIsEditing);
    const categoryIsDeleting = useSelector(selectCategoryIsDeleting);
    if (categoriesIsFetching) {
        return <Spiner />;
    }
    return (
        <>
            {messageSuccess && <Message isOpen status={"success"} message={messageSuccess} />}{" "}
            {messageError && <Message isOpen status={"error"} message={messageError} />}
            <div className="categories">
                <Header>
                    <CategoryHeader openAddCategory={() => setIsOpenAddCategory(true)} />
                </Header>
                {isOpenAddCategory ? (
                    <ModalAddNewCategory
                        open={isOpenAddCategory}
                        handleClose={() => setIsOpenAddCategory(false)}
                        colors={colors}
                        categoryIsAdding={categoryIsAdding}
                    />
                ) : (
                    ""
                )}

                {categoriesList.length > 0 && colors.length && (
                    <CategoryList
                        categoryList={categoriesList}
                        setOpenEdit={setOpenEdit}
                        setSelectedCategory={setSelectedCategory}
                    />
                )}
                <ModalEditCategory
                    open={openEdit}
                    handleClose={() => setOpenEdit(false)}
                    selectedCategory={selectedCategory}
                    categoryIsEditing={categoryIsEditing}
                    categoryIsDeleting={categoryIsDeleting}
                    colors={colors}
                />
            </div>
        </>
    );
};
export default CategoriesPage;
