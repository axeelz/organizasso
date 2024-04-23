import { useContext } from "react";
import AskToLogin from "../components/AskToLogin";
import ForumsList from "../components/ForumsList";
import { UserContext } from "../context/user";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const { isLoggedIn, loading } = useContext(UserContext);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isLoggedIn) {
    return <AskToLogin />;
  }

  return (
    <>
      <ForumsList />
    </>
  );
};

export default Home;
