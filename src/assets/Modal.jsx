import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { transactionAction } from "../store/TransactionSlice";
import { createPortal } from "react-dom";

const Modal = ({ id, children }) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const modalIsOpen = useSelector((state) => state.transaction.modalIsOpen);

  console.log(modalIsOpen);
  console.log("Modal");

  useEffect(() => {
    if (modalIsOpen[id]) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [modalIsOpen[id]]);

  function handleCloseModal() {
    dispatch(transactionAction.closeModal(id));
  }

  return createPortal(
    <dialog className="modal" ref={modalRef}>
      <div className="modal-content">
        <button onClick={handleCloseModal}>Close</button>
        {children}
      </div>
    </dialog>,
    document.getElementById("modal")
  );
};

export default Modal;
