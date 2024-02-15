import "./Message.css";
import { useState, useEffect } from "react";

const Message = ({ msg, type }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // using setTimeOut to hide the message for 2 seconds
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 2000);

    // clear the timeOut when the component is open
    return () => clearTimeout(timeout);
  }, []);

  return visible ? (
    <div className={`message ${type}`}>
      <p>{msg}</p>
    </div>
  ) : null;
};

export default Message;
