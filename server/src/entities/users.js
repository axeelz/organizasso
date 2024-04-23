class Users {
  constructor(db) {
    this.db = db;
    // suite plus tard avec la BD
  }

  // Crée un nouvel utilisateur
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

  // Renvoie les informations d'un utilisateur par son id
  get(userid) {
    return new Promise(async (resolve, reject) => {
      const { ObjectId } = require("mongodb");
      const objId = new ObjectId(String(userid));
      const user = await this.db.collection("users").findOne({ _id: objId }, { projection: { password: 0 } });
      if (user) {
        resolve(user);
      } else {
        reject({ error: { message: "Utilisateur inexistant" } });
      }
    });
  }

  getAll() {
    return new Promise(async (resolve, reject) => {
      const users = await this.db
        .collection("users")
        .find({}, { projection: { password: 0 } })
        .toArray();
      resolve(users);
    });
  }

  // Vérifie si un utilisateur existe déjà
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

  // Effectue une requête bd pour vérifier le mot de passe et retourne l'id de l'utilisateur
  checkpassword(login, password) {
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
