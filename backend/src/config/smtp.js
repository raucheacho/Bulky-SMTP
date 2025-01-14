require("dotenv").config({ path: "../.env" });

module.exports = {
  host: process.env.SMTP_HOST, // Exemple: mail.votredomaine.com
  port: process.env.SMTP_PORT || 587, // 587 pour TLS, 465 pour SSL
  secure: process.env.SMTP_SECURE === "true", // Utiliser SSL ou non
  auth: {
    user: process.env.SMTP_USER, // Ton email
    pass: process.env.SMTP_PASS, // Ton mot de passe
  },
};
