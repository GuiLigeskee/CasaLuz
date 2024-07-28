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
      <h1>
        {type === "CREATE" && "O anúncio foi criado com sucesso!"}
        {type === "PUT" && "O anúncio foi atualizado com sucesso!"}
      </h1>
      <p>{msg}</p>
      <div>
        {type === "CREATE" && (
          <>
            <button onClick={() => handleAction("CREATE")}>
              Cadastrar Novo Anúncio
            </button>
            {/* <button onClick={() => handleAction()}>
              Ir para o Anúncio Cadastrado
            </button> */}
          </>
        )}
        {type === "PUT" && (
          <>
            <button onClick={onClose}>Fechar</button>
            {/* <button onClick={() => handleAction()}>
              Ir para o Anúncio Atualizado
            </button> */}
          </>
        )}
      </div>
    </Modal>
  );
};

export default SuccessModal;
