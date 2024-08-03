import "./SuccessModal.css";
import React, { useEffect } from "react";
import Modal from "react-modal";

const SuccessModal = ({
  isOpen,
  onClose,
  isAnimationDone,
  isAnimationClosing,
  type,
  msg,
  setIsAnimationDone,
  onResetStates,
}) => {
  useEffect(() => {
    if (isOpen) {
      setIsAnimationDone(true);
    }
  }, [isOpen, setIsAnimationDone]);

  const handleAction = (actionType) => {
    if (actionType === "CREATE") {
      if (onResetStates) {
        onResetStates();
      }
      if (onClose) {
        onClose();
      }
    } else if (actionType === "PUT") {
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Sucesso Modal"
      overlayClassName={`custom-modal-overlay ${
        isAnimationDone
          ? isAnimationClosing
            ? "custom-modal-overlay-close"
            : "custom-modal-overlay-open"
          : ""
      }`}
      className={`custom-modal-content ${
        isAnimationDone ? "custom-modal-content-open" : ""
      } ${isAnimationClosing ? "custom-modal-content-close" : ""}`}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      <div className="custom-modal-success-container">
        <h1 className="custom-modal-success-title">
          {type === "CREATE" && "O anúncio foi criado com sucesso!"}
          {type === "PUT" && "O anúncio foi atualizado com sucesso!"}
        </h1>
        <p className="custom-modal-success-message">{msg}</p>
        <div className="custom-modal-success-buttons">
          {type === "CREATE" && (
            <>
              <button
                className="custom-modal-success-button"
                onClick={() => handleAction("CREATE")}
              >
                Cadastrar Novo Anúncio
              </button>
              {/* <button onClick={() => handleAction()}>
                Ir para o Anúncio Cadastrado
              </button> */}
            </>
          )}
          {type === "PUT" && (
            <>
              <button className="custom-modal-success-button" onClick={onClose}>
                Fechar
              </button>
              {/* <button onClick={() => handleAction()}>
                Ir para o Anúncio Atualizado
              </button> */}
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;
