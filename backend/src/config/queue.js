const Queue = require("bull");

// Détecte l'environnement et définit le bon hôte Redis
const redisHost =
  process.env.NODE_ENV === "production" ? process.env.REDIS_HOST : "localhost";

const redisPort = process.env.REDIS_PORT || 6379;

// Crée la file d'attente Bull
const emailQueue = new Queue("emailQueue", {
  redis: {
    host: redisHost,
    port: redisPort,
  },
});

// Log pour confirmer la connexion à Redis
emailQueue.on("ready", () => {
  console.log(`✅ Connected to Redis at ${redisHost}:${redisPort}`);
});

emailQueue.on("error", (err) => {
  console.error("❌ Redis connection error:", err);
});

module.exports = emailQueue;
