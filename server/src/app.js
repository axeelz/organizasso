const path = require("path");
const api = require("./api.js");
const { MongoClient } = require("mongodb");

// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

express = require("express");
const app = express();
// api_1 = require("./api.js");
const session = require("express-session");

app.use(
  session({
    secret: "technoweb rocks",
    resave: true,
    saveUninitialized: false,
  })
);

async function connectToDatabase() {
  const uri = "mongodb://localhost";
  const client = new MongoClient(uri);
  try {
    // Connexion au serveur
    await client.connect();
    // Sélection de la base de données
    const db = client.db("organizasso");
    return db;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

async function initializeApi() {
  const db = await connectToDatabase();
  app.use("/api", api.default(db));
  console.log("API initialized");
}

initializeApi();

// Démarre le serveur
app.on("close", () => {});
exports.default = app;
