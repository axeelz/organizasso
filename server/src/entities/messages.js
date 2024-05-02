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

  // Récupère tous les messages
  getAll() {
    return new Promise(async (resolve, reject) => {
      try {
        // On renvoie les messages avec les infos sur leur auteur
        const messages = await this.db
          .collection("messages")
          .aggregate([
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

  // Supprimer un message
  delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const objId = new ObjectId(String(id));
        const message = await this.db.collection("messages").deleteOne({ _id: objId });
        if (message.deletedCount === 1) {
          resolve();
        } else {
          reject({ error: { message: "Message non trouvé" } });
        }
      } catch (e) {
        console.error(e);
        reject({ error: { message: "Erreur lors de la suppression du message" } });
      }
    });
  }

  // Vérifier si un utilisateur est l'auteur d'un message
  isAuthor(userId, messageId) {
    return new Promise(async (resolve, reject) => {
      try {
        const objMessageId = new ObjectId(String(messageId));
        const message = await this.db.collection("messages").findOne({ _id: objMessageId });
        if (userId.equals(message.userId)) {
          console.log("L'auteur est bien l'utilisateur connecté");
          resolve(true);
        } else {
          console.log("L'auteur n'est pas l'utilisateur connecté");
          resolve(false);
        }
      } catch (e) {
        console.error(e);
        reject({ error: { message: "Erreur lors de la vérification de l'auteur" } });
      }
    });
  }
}

exports.default = Messages;
