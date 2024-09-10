import "./ErrorModal.css";
import React, { useEffect } from "react";
import Modal from "react-modal";

const ErrorModal = ({
  isOpen,
  onClose,
  isAnimationDone,
  isAnimationClosing,
  errors = {},
  setIsAnimationDone,
}) => {
  useEffect(() => {
    if (isOpen) {
      setIsAnimationDone(true);
    }
  }, [isOpen, setIsAnimationDone]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Erros de Validação"
      overlayClassName={`modal-overlay ${
        isAnimationDone
          ? isAnimationClosing
            ? "modal-overlay-close"
            : "modal-overlay-open"
          : ""
      }`}
      className={`modal-content modal-content-error ${
        isAnimationDone ? "modal-content-open" : ""
      } ${isAnimationClosing ? "modal-content-close" : ""}`}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      <div className="modal-container">
        <h1 className="modal-title">Ops!</h1>
        {Object.keys(errors).length > 0 && (
          <ul className="modal-list">
            {/* {Object.values(errors).map((error, index) => (
              <li key={index} className="modal-list-item">
                - {error}
              </li>
            ))} */}
            {Object.values(errors)
              .slice(0, 5)
              .map((error, index) => (
                <li key={index} className="modal-list-item">
                  - {error}
                </li>
              ))}
          </ul>
        )}
        <button className="modal-button" onClick={onClose}>
          Fechar
        </button>
      </div>
    </Modal>
  );
};

export default ErrorModal;
