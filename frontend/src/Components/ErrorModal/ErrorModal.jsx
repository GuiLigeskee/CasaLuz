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
      overlayClassName={`custom-error-modal-overlay ${
        isAnimationDone
          ? isAnimationClosing
            ? "custom-error-modal-overlay-close"
            : "custom-error-modal-overlay-open"
          : ""
      }`}
      className={`custom-error-modal-content ${
        isAnimationDone ? "custom-error-modal-content-open" : ""
      } ${isAnimationClosing ? "custom-error-modal-content-close" : ""}`}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      <div className="custom-error-modal-container">
        <h1 className="custom-error-modal-title">
          Corrija os erros abaixo para continuar
        </h1>
        {Object.keys(errors).length > 0 && (
          <ul className="custom-error-modal-list">
            {Object.values(errors).map((error, index) => (
              <li key={index} className="custom-error-modal-list-item">
                {error}
              </li>
            ))}
          </ul>
        )}
        <button className="custom-error-modal-button" onClick={onClose}>
          Fechar
        </button>
      </div>
    </Modal>
  );
};

export default ErrorModal;
