import { useState } from "react";
import styles from "./NewMessage.module.css";
import { IoIosSend } from "react-icons/io";

const NewMessage = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    onSend(message);
    setMessage("");
  };

  return (
    <div className={styles.container}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={styles.textarea}
        placeholder="Nouveau message"
      />
      <button onClick={handleSend} className={styles.send}>
        <IoIosSend />
        <span>Envoyer</span>
      </button>
    </div>
  );
};

export default NewMessage;
