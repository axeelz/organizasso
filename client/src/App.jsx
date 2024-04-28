import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import NotFound from "./pages/NotFound.jsx";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Profile from "./pages/Profile.jsx";
import Search from "./pages/Search.jsx";
import { useEffect, useState } from "react";
import Admin from "./pages/Admin.jsx";
import Forum from "./pages/Forum.jsx";
import axios from "axios";
import { UserContext } from "./context/user.js";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import { Toaster } from "sonner";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEnvSet()) return;
    console.log("Checking auth status...");
    axios
      .get(import.meta.env.VITE_API_URL + "/user/session", { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          console.log("Logged in!");
          const user = res.data.user;
          setLoggedInUser(user);
          setIsLoggedIn(true);
        }
      })
      .catch(() => {
        console.log("Not logged in");
        setIsLoggedIn(false);
        setLoggedInUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  const LoggedOutOnlyRoute = () => {
    return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
  };

  const LoggedInOnlyRoute = () => {
    if (loading) return <LoadingSpinner />;
    return !isLoggedIn ? <Navigate to="/login" /> : <Outlet />;
  };

  const isEnvSet = () => {
    return import.meta.env.VITE_API_URL !== undefined;
  };

  if (!isEnvSet())
    return (
      <main>
        <h1>Erreur de configuration</h1>
        <p>
          L'application nécessite des variables d'environnement manquantes. Consultez le fichier <code>README.md</code>{" "}
          pour plus d'informations.
        </p>
      </main>
    );

  return (
    <UserContext.Provider value={{ isLoggedIn, loggedInUser, loading }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route element={<LoggedOutOnlyRoute />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>

          <Route element={<LoggedInOnlyRoute />}>
            <Route path="profile" element={<Profile />} />
            <Route path="profile/:username" element={<Profile />} />
            <Route path="search" element={<Search />} />
            <Route path="forum/:name" element={<Forum />} />
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <Toaster richColors />
    </UserContext.Provider>
  );
};

export default App;
