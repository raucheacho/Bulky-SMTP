const { sequelize } = require("./models");
const app = require("./app");
const PORT = process.env.BACKEND_PORT;

(async () => {
  try {
    await sequelize.sync(); // Synchronisation avec la base SQLite
    console.log("Base de données synchronisée.");
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  } catch (error) {
    console.error(
      "Erreur lors de la synchronisation de la base de données :",
      error
    );
  }
})();
