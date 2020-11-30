import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import Header from "../../../../components/Header";
import CategoryHeader from "../CategoryHeader";
import ModalAddNewCategory from "../ModalAddNewCategory";

import { runFetchCategories } from "../../../../ducks/categories/actionCreators/fetchCategories";

import { ICategory } from "../../../../ducks/categories/contracts/state";
import { IGlobalStore } from "../../../../reducers/rootReducer";
import CategoryList from "../CategoryList";
import ModalEditCategory from "../ModalEditCatrgory";

const CategoriesPage: React.FC = (): React.ReactElement => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(runFetchCategories());
    }, [dispatch]);

    const initialCategory = {
        _id: "1",
        name: "test name",
        color: { _id: "12345", hex: "red" },
    };
    const [isOpenAddCategory, setIsOpenAddCategory] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);

    const [openEdit, setOpenEdit] = useState(false);
    const { colors, categoryesList } = useSelector(({ colors, categories }: IGlobalStore) => {
        return {
            categoryesList: categories.categoryesList.map((item: ICategory) => {
                return {
                    _id: item._id,
                    name: item.name,
                    color: colors.colorsList.find((el) => el._id.toString() === item.colorId)!,
                };
            }),
            colors: colors.colorsList,
        };
    });

    return (
        <div className="categories">
            <Header>
                <CategoryHeader openAddCategory={() => setIsOpenAddCategory(true)} />
            </Header>
            {isOpenAddCategory ? (
                <ModalAddNewCategory open={isOpenAddCategory} handleClose={() => setIsOpenAddCategory(false)} />
            ) : (
                ""
            )}

            {categoryesList.length > 0 && colors.length && (
                <CategoryList
                    categoryList={categoryesList}
                    setOpenEdit={setOpenEdit}
                    setSelectedCategory={setSelectedCategory}
                />
            )}
            <ModalEditCategory
                open={openEdit}
                handleClose={() => setOpenEdit(false)}
                selectedCategory={selectedCategory}
                categoryList={categoryesList}
            />
        </div>
    );
};
export default CategoriesPage;
