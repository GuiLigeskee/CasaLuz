import React, { useEffect } from "react";
import Modal from "react-modal";
import { useSpring, animated } from "react-spring";
import "./Message.css";

Modal.setAppElement("#root");

const Message = ({ msg, type, isOpen, onRequestClose }) => {
  const animation = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "translateY(0%)" : "translateY(-100%)",
    config: { tension: 300, friction: 30 },
  });

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onRequestClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onRequestClose]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="message-modal"
      overlayClassName="message-overlay"
    >
      <animated.div style={animation} className={`message ${type}`}>
        <h2>{type}</h2>
        <p>{msg}</p>
      </animated.div>
    </Modal>
  );
};

export default Message;
