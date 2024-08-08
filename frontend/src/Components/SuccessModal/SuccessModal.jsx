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
    if (actionType === "CREATE_ADS") {
      if (onResetStates) {
        onResetStates();
      }
    } else if (actionType == "CREATE_DEPOIMENT") {
      if (onResetStates) {
        onResetStates();
      }
    } else if (actionType == "REGISTER") {
      if (onResetStates) {
        onResetStates();
      }
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
          {type === "CREATE_ADS" && "O anúncio foi criado com sucesso!"}
          {type === "PUT_ADS" && "O anúncio foi atualizado com sucesso!"}
          {type === "CREATE_DEPOIMENT" &&
            "O depoimento foi criado com sucesso!"}
          {type === "REGISTER" && "Administrador cadastrado com sucesso!"}
        </h1>
        <p className="success-message">{msg}</p>
        <div className="success-buttons">
          {type === "CREATE_ADS" && (
            <>
              <button
                className="success-button"
                onClick={() => handleAction("CREATE_ADS")}
              >
                Cadastrar novo anúncio
              </button>
              <button onClick={() => navigate("/")}>Ir para home</button>
            </>
          )}
          {type === "PUT_ADS" && (
            <>
              <button className="success-button" onClick={onClose}>
                Fechar
              </button>
              <button onClick={() => navigate("/")}>Ir para home</button>
            </>
          )}
          {type === "CREATE_DEPOIMENT" && (
            <>
              <button
                className="success-button"
                onClick={() => handleAction("CREATE_DEPOIMENT")}
              >
                Cadastrar novo depoimento
              </button>
              <button onClick={() => navigate("/")}>Ir para home</button>
            </>
          )}
          {type === "REGISTER" && (
            <>
              <button
                className="success-button"
                onClick={() => handleAction("REGISTER")}
              >
                Cadastrar novo administrador
              </button>
              <button className="success-button" onClick={onClose}>
                Fechar
              </button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;
