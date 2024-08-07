import "./SuccessModal.css";
import { useEffect } from "react";
import Modal from "react-modal";

import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
    } else if (actionType === "PUT") {
      // TESTE
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Sucesso Modal"
      overlayClassName={`overlay ${
        isAnimationDone
          ? isAnimationClosing
            ? "overlay-close"
            : "overlay-open"
          : ""
      }`}
      className={`modal-content modal-content-success ${
        isAnimationDone ? "content-open" : ""
      } ${isAnimationClosing ? "content-close" : ""}`}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      <div className="success-container">
        <h1 className="success-title">
          {type === "CREATE" && "O anúncio foi criado com sucesso!"}
          {type === "PUT" && "O anúncio foi atualizado com sucesso!"}
        </h1>
        <p className="success-message">{msg}</p>
        <div className="success-buttons">
          {type === "CREATE" && (
            <>
              <button
                className="success-button"
                onClick={() => handleAction("CREATE")}
              >
                Cadastrar movo anúncio
              </button>
              <button onClick={() => navigate("/")}>Ir para home</button>
            </>
          )}
          {type === "PUT" && (
            <>
              <button className="success-button" onClick={onClose}>
                Fechar
              </button>
              <button onClick={() => navigate("/")}>Ir para home</button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;
