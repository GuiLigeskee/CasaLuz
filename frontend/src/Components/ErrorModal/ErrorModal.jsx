import React, { useEffect } from "react";
import Modal from "react-modal";

const ErrorModal = ({
  isOpen,
  onClose,
  isAnimationDone,
  isAnimationClosing,
  errors = {}, // Define a default value to ensure it's always an object
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
      className={`modal-content ${
        isAnimationDone ? "modal-content-open" : ""
      } ${isAnimationClosing ? "modal-content-close" : ""}`}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      <h1>Corrija os erros abaixo para continuar</h1>
      {Object.keys(errors).length > 0 && (
        <ul>
          {Object.values(errors).map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
      <button onClick={onClose}>Fechar</button>
    </Modal>
  );
};

export default ErrorModal;
