import MessagesList from "../components/MessagesList";
import NewMessage from "../components/NewMessage";
import ForumHeader from "../components/ForumHeader";
import BackToList from "../components/BackToList";
import { useParams, Navigate } from "react-router-dom";

const Forum = () => {
  const { name } = useParams();
  const forums = ["ouvert", "ferme"];

  if (!forums.includes(name)) {
    return <Navigate to="/forum/ouvert" />;
  }

  const displayName = name === "ouvert" ? "ouvert" : "fermé";

  return (
    <>
      <ForumHeader name={displayName} />
      <main>
        <BackToList />
        <NewMessage />
        <MessagesList />
      </main>
    </>
  );
};

export default Forum;
