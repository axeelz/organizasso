const { ObjectId } = require("mongodb");

class Messages {
  constructor(db) {
    this.db = db;
  }

  // Crée un nouveau message
  create(userId, content, forum, replyTo) {
    return new Promise(async (resolve, reject) => {
      const message = {
        userId: new ObjectId(String(userId)),
        content: content,
        forum: forum,
        date: new Date(),
        replyTo: replyTo ? new ObjectId(String(replyTo)) : null,
      };
      try {
        const newMessage = await this.db.collection("messages").insertOne(message);
        resolve(newMessage.insertedId);
      } catch (e) {
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
            // On ne récupère que les messages qui ne sont pas des réponses,
            // puisqu'elles seront affichées dans le champ "replies" des messages parents
            { $match: { replyTo: null } },
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
            // On ne renvoie pas le mot de passe de l'utilisateur, et on n'affiche pas le champs replyTo
            {
              $project: {
                user: {
                  password: 0,
                },
                replyTo: 0,
              },
            },
            // Les plus récents en premier
            { $sort: { date: -1 } },
            // Ajouter un champs "replies", qui liste tous les messages ayant ce message comme replyTo, avec les infos sur leur auteur
            {
              $lookup: {
                from: "messages",
                localField: "_id",
                foreignField: "replyTo",
                as: "replies",
                pipeline: [
                  {
                    $lookup: {
                      from: "users",
                      localField: "userId",
                      foreignField: "_id",
                      as: "user",
                    },
                  },
                  { $unwind: "$user" },
                  {
                    $project: {
                      user: {
                        password: 0,
                      },
                    },
                  },
                ],
              },
            },
          ])
          .toArray();
        resolve(messages);
      } catch (e) {
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
              $match: { forum: forum, replyTo: null },
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
            // On ne renvoie pas le mot de passe de l'utilisateur, et on n'affiche pas le champs replyTo
            {
              $project: {
                user: {
                  password: 0,
                },
                replyTo: 0,
              },
            },
            // Les plus récents en premier
            { $sort: { date: -1 } },
            // Ajouter un champs "replies", qui liste tous les messages ayant ce message comme replyTo, avec les infos sur leur auteur
            {
              $lookup: {
                from: "messages",
                localField: "_id",
                foreignField: "replyTo",
                as: "replies",
                pipeline: [
                  {
                    $lookup: {
                      from: "users",
                      localField: "userId",
                      foreignField: "_id",
                      as: "user",
                    },
                  },
                  { $unwind: "$user" },
                  {
                    $project: {
                      user: {
                        password: 0,
                      },
                    },
                  },
                ],
              },
            },
          ])
          .toArray();
        resolve(messages);
      } catch (e) {
        reject({ error: { message: "Erreur lors de la récupération des messages" } });
      }
    });
  }

  // Supprimer un message
  delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const objId = new ObjectId(String(id));
        // On supprime tous les messages qui ont ce message comme replyTo
        await this.db.collection("messages").deleteMany({ replyTo: objId });
        const message = await this.db.collection("messages").deleteOne({ _id: objId });
        if (message.deletedCount === 1) {
          resolve();
        } else {
          reject({ error: { message: "Message non trouvé" } });
        }
      } catch (e) {
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
        reject({ error: { message: "Message non trouvé" } });
      }
    });
  }
}

exports.default = Messages;
