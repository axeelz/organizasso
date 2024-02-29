import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignup = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main>
      <h2>Inscription</h2>
      <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Inscription</button>
      {error && <p>{error}</p>}
      <p>
        Tu as déjà un compte ? <Link to="/login">Connecte toi !</Link>
      </p>
    </main>
  );
};

export default SignUp;