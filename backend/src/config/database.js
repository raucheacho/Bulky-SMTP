require("dotenv").config({ path: "../.env" });
const { Sequelize } = require("sequelize");

// Vérifier si l'environnement est en développement ou en production
const isProduction = process.env.NODE_ENV === "production";

// Configuration de la base de données
let sequelize;

if (isProduction) {
  console.log(isProduction);

  // Utiliser PostgreSQL en production
  sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "email_service",
  });
} else {
  // Utiliser SQLite en développement
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./email-server.sqlite", // Chemin vers la base de données SQLite
  });
}

module.exports = sequelize;
