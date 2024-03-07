import { useState } from "react";
import styles from "./NewMessage.module.css";
import { IoIosSend } from "react-icons/io";

const NewMessage = ({ isReply }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    setMessage("");
  };

  return (
    <div className={styles.container}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={isReply ? "Répondre à ce message" : "Nouveau message"}
      />
      <button onClick={handleSend} className={styles.send}>
        <IoIosSend />
        <span>Envoyer</span>
      </button>
    </div>
  );
};

export default NewMessage;
