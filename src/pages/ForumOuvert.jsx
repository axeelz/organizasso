import MessagesList from "../components/MessagesList";
import NewMessage from "../components/NewMessage";
import ForumHeader from "../components/ForumHeader";
import BackToList from "../components/BackToList";

const ForumOuvert = () => {
  return (
    <>
      <ForumHeader name="ouvert" />
      <main>
        <BackToList />
        <NewMessage />
        <MessagesList />
      </main>
    </>
  );
};
export default ForumOuvert;
