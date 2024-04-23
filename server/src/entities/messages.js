const { ObjectId } = require("mongodb");

class Messages {
  constructor(db) {
    this.db = db;
  }

  // Crée un nouveau message
  create(userId, content, forum) {
    return new Promise(async (resolve, reject) => {
      const message = {
        userId: new ObjectId(String(userId)),
        content: content,
        forum: forum,
        date: new Date(),
      };
      try {
        const newMessage = await this.db.collection("messages").insertOne(message);
        resolve(newMessage.insertedId);
      } catch (e) {
        console.error(e);
        reject({ error: { message: "Erreur lors de la création du message" } });
      }
    });
  }

  // Récupère les messages d'un forum ("ouvert" ou "ferme")
  getByForum(forum) {
    return new Promise(async (resolve, reject) => {
      try {
        // On renvoie les messages avec les infos sur leur auteur
        const messages = await this.db
          .collection("messages")
          .aggregate([
            {
              $match: { forum: forum },
            },
            {
              $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user",
              },
            },
            // On récupère un objet user au lieu d'un tableau
            { $unwind: "$user" },
            // On ne renvoie pas le mot de passe de l'utilisateur
            {
              $project: {
                user: {
                  password: 0,
                },
              },
            },
            // Les plus récents en premier
            { $sort: { date: -1 } },
          ])
          .toArray();
        resolve(messages);
      } catch (e) {
        console.error(e);
        reject({ error: { message: "Erreur lors de la récupération des messages" } });
      }
    });
  }
}

exports.default = Messages;
