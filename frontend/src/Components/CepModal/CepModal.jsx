import { useEffect } from "react";
import Modal from "react-modal";

const CepModal = ({
  isOpen,
  onClose,
  isAnimationDone,
  isAnimationClosing,
  messageZipCode,
  zipCodeApi,
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
      contentLabel="Verificação de CEP"
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
      <h1>Resultado da Pesquisa</h1>
      {messageZipCode && <p>{messageZipCode}</p>}
      {zipCodeApi && (
        <div>
          <p>
            <strong>Rua:</strong> {zipCodeApi.logradouro}
          </p>
          <p>
            <strong>Bairro:</strong> {zipCodeApi.bairro}
          </p>
          <p>
            <strong>Cidade:</strong> {zipCodeApi.localidade}
          </p>
          <p>
            <strong>Estado:</strong> {zipCodeApi.uf}
          </p>
        </div>
      )}
      <button onClick={onClose}>Fechar</button>
    </Modal>
  );
};

export default CepModal;
