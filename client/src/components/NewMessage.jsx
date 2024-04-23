import { useState } from "react";
import styles from "./NewMessage.module.css";
import { IoIosSend } from "react-icons/io";
import axios from "axios";
import { toast } from "sonner";

const NewMessage = ({ forumName, isReply }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    axios
      .post(
        import.meta.env.VITE_API_URL + "/message",
        {
          content: message,
          forum: forumName,
        },
        { withCredentials: true }
      )
      .then(() => {
        setMessage("");
        toast.success("Message envoyé !");
      })
      .catch((err) => {
        const { message } = err.response.data;
        toast.error(message);
      });
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
