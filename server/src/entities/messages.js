class Messages {
  constructor(db) {
    this.db = db;
  }

  // Crée un nouveau message
  create(userId, content, forum) {
    return new Promise(async (resolve, reject) => {
      const message = {
        userId: userId,
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
}

exports.default = Messages;
