const express = require("express");
const Users = require("./entities/users.js");

function init(db) {
  const router = express.Router();
  // On utilise JSON
  router.use(express.json());
  // simple logger for this router's requests
  // all requests to this router will first hit this middleware
  router.use((req, res, next) => {
    console.log("API: method %s, path %s", req.method, req.path);
    console.log("Body", req.body);
    next();
  });

  const users = new Users.default(db);

  router.post("/user/login", async (req, res) => {
    try {
      const { login, password } = req.body;
      // Erreur sur la requête HTTP
      if (!login || !password) {
        return res.status(400).json({
          status: 400,
          message: "Le nom d'utilisateur et le mot de passe sont obligatoires",
        });
      }
      if (!(await users.exists(login))) {
        return res.status(401).json({
          status: 401,
          message: "Utilisateur inconnu",
        });
      }
      let userid = await users.checkpassword(login, password);
      if (userid) {
        // Avec middleware express-session
        req.session.regenerate(function (err) {
          if (err) {
            res.status(500).json({
              status: 500,
              message: "Erreur interne",
            });
          } else {
            // C'est bon, nouvelle session créée
            req.session.userid = userid;
            res.status(200).json({
              status: 200,
              message: "Login et mot de passe accepté",
            });
          }
        });
        return;
      }
      // Faux login : destruction de la session et erreur
      req.session.destroy((err) => {});
      return res.status(403).json({
        status: 403,
        message: "Nom d'utilisateur ou mot de passe incorrect",
      });
    } catch (e) {
      // Toute autre erreur
      return res.status(500).json({
        status: 500,
        message: "Erreur interne",
        details: (e || "Erreur inconnue").toString(),
      });
    }
  });

  router.post("/user/signup", async (req, res) => {
    const { login, password, lastname, firstname } = req.body;
    if (!login || !password || !lastname || !firstname) {
      return res.status(400).json({
        status: 400,
        message: "Tous les champs sont obligatoires",
      });
    }
    if (await users.exists(login)) {
      return res.status(409).json({
        status: 409,
        message: "Nom d'utilisateur déjà utilisé",
      });
    }
    const bcrypt = require("bcrypt");
    const workFactor = 8;
    const hash = await bcrypt.hash(password, workFactor);
    users
      .create(login, hash, lastname, firstname)
      .then((user_id) => res.status(201).json({ id: user_id }))
      .catch((err) => res.status(500).json({ status: 500, message: err }));
  });

  router
    .route("/user/:user_id(\\d+)")
    .get(async (req, res) => {
      try {
        const user = await users.get(req.params.user_id);
        if (!user) res.sendStatus(404);
        else res.send(user);
      } catch (e) {
        res.status(500).send(e);
      }
    })
    .delete((req, res, next) => res.send(`delete user ${req.params.user_id}`));

  router.put("/user", (req, res) => {
    const { login, password, lastname, firstname } = req.body;
    if (!login || !password || !lastname || !firstname) {
      res.status(400).send("Missing fields");
    } else {
      users
        .create(login, password, lastname, firstname)
        .then((user_id) => res.status(201).send({ id: user_id }))
        .catch((err) => res.status(500).send(err));
    }
  });

  return router;
}

exports.default = init;
