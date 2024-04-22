class Users {
  constructor(db) {
    this.db = db;
    // suite plus tard avec la BD
  }

  create(login, password, lastname, firstname) {
    return new Promise(async (resolve, reject) => {
      const user = {
        username: login,
        password: password,
        firstName: firstname,
        lastName: lastname,
        isVerified: false,
        isAdmin: false,
        createdAt: new Date(),
      };
      try {
        const newUser = await this.db.collection("users").insertOne(user);
        resolve(newUser.insertedId);
      } catch (e) {
        console.error(e);
        reject({ error: { message: "Username déjà utilisé" } });
      }
    });
  }

  get(userid) {
    return new Promise(async (resolve, reject) => {
      const { ObjectId } = require("mongodb");
      const objId = new ObjectId(String(userid));
      const user = await this.db.collection("users").findOne({ _id: objId });
      if (user) {
        // On rend "id" aussi accessible (en plus de _id), par simplicité
        user.id = user._id;
        resolve(user);
      } else {
        reject({ error: { message: "Utilisateur inexistant" } });
      }
    });
  }

  async exists(login) {
    return new Promise(async (resolve, reject) => {
      const matchingUser = await this.db.collection("users").findOne({
        username: login,
      });
      if (matchingUser) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  checkpassword(login, password) {
    // Effectue une requête bd pour vérifier le mot de passe et retourne l'id de l'utilisateur
    return new Promise(async (resolve, reject) => {
      const matchingUser = await this.db.collection("users").findOne({
        username: login,
      });
      if (matchingUser) {
        const bcrypt = require("bcrypt");
        bcrypt.compare(password, matchingUser.password, (err, match) => {
          if (match) {
            resolve(matchingUser._id);
          } else {
            resolve(null);
          }
        });
      } else {
        resolve(null);
      }
    });
  }
}

exports.default = Users;
