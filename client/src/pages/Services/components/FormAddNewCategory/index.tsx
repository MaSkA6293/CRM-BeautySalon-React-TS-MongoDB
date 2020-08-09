import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./styles.scss";
import Modal from "react-modal";
import FormicAddCategory from "./FormicAddCategory";
import Spiner from "../../../../components/Spiner";
import cogoToast from "cogo-toast";
import { ICategoryValues } from "../../types";
import { IGlobalStore } from "../../../../reducers/rootReducer";
import { addCategory } from "../../actions/actionsServices";
type ModalAddNewCategory = {
  isOpen: boolean;
  closeModal: () => void;
};

const ModalAddNewCategory = ({ isOpen, closeModal }: ModalAddNewCategory) => {
  const dispatch = useDispatch();
  const {
    categoryIsAdded,
    categoryAdded,
    categoryAddIsFail,
    categoryAddError,
  } = useSelector(({ services }: IGlobalStore) => {
    return {
      categoryIsAdded: services.categoryIsAdded,
      categoryAdded: services.categoryAdded,
      categoryAddIsFail: services.categoryAddIsFail,
      categoryAddError: services.categoryAddError,
    };
  });

  const handlerAddCategory = (values: ICategoryValues) => {
    dispatch(
      addCategory(
        {
          name: values.name,
          comment: values.comment,
          color: values.color,
        },
        closeModal
      )
    );
  };

  if (categoryIsAdded) {
    cogoToast.success(<div className="message">Клиент успешно добавлен</div>);
  }
  if (categoryAddError) {
    cogoToast.error(<div className="message">{categoryAddError}</div>);
  }
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="Modal"
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <FormicAddCategory
          handlerAddCategory={handlerAddCategory}
          categoryIsAdded={categoryIsAdded}
          categoryAddIsFail={categoryAddIsFail}
          categoryAdded={categoryAdded}
          closeModal={closeModal}
        />
        {categoryIsAdded ? <Spiner /> : ""}
      </Modal>
    </div>
  );
};

export default ModalAddNewCategory;
