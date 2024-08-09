import "./SuccessModal.css";

import Modal from "react-modal";
import { useEffect } from "react";
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

  const handleAction = () => {
    if (onResetStates) onResetStates();
    if (onClose) onClose();
  };

  // Coloca o titulo referente a ação de sucesso
  const getTitle = () => {
    switch (type) {
      case "CREATE_ADS":
        return "Anúncio publicado com sucesso!";
      case "PUT_ADS":
        return "Anúncio atualizado com sucesso!";
      case "CREATE_DEPOIMENT":
        return "Depoimento publicado com sucesso!";
      case "REGISTER":
        return "Administrador criado com sucesso!";
      default:
        return "";
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
      className={`modal-content modal-content-success ${
        isAnimationDone ? "modal-content-open" : ""
      } ${isAnimationClosing ? "modal-content-close" : ""}`}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      <div className="success-container">
        <h1 className="success-title">{getTitle()}</h1>
        {/* <p className="success-message">{msg}</p> */}
        <div className="success-buttons">
          {type !== "PUT_ADS" && (
            <>
              <button className="success-button" onClick={() => handleAction()}>
                {type === "CREATE_ADS"
                  ? "Cadastrar novo anúncio"
                  : type === "CREATE_DEPOIMENT"
                  ? "Cadastrar novo depoimento"
                  : "Cadastrar novo administrador"}
              </button>
              {type === "REGISTER" ? (
                <button onClick={() => navigate("/")}>Ir para home</button>
              ) : (
                <button className="success-button" onClick={onClose}>
                  Fechar
                </button>
              )}
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
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;
