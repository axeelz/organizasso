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
    return new Promise((resolve, reject) => {
      const user = {
        login: "pikachu",
        password: "1234",
        lastname: "chu",
        firstname: "pika",
      }; // À remplacer par une requête bd

      if (false) {
        //erreur
        reject();
      } else {
        if (userid == 1) {
          resolve(user);
        } else {
          resolve(null);
        }
      }
    });
  }

  async exists(login) {
    return new Promise((resolve, reject) => {
      if (false) {
        //erreur
        reject();
      } else {
        resolve(true);
      }
    });
  }

  checkpassword(login, password) {
    return new Promise((resolve, reject) => {
      let userid = 1; // À remplacer par une requête bd
      if (false) {
        //erreur
        reject();
      } else {
        resolve(userid);
      }
    });
  }
}

exports.default = Users;
