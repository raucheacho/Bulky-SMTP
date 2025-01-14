const express = require("express");
const emailQueue = require("../config/queue");
const { sendMail } = require("../services/mailer");

const router = express.Router();

// Ajouter des emails à la file
router.post("/send", async (req, res) => {
  const { recipients, subject, text, html } = req.body;

  if (!recipients || !subject || (!text && !html)) {
    return res.status(400).json({ error: "Paramètres invalides." });
  }
  const arrayRecipients = JSON.parse(recipients);
  console.log(arrayRecipients);

  arrayRecipients.forEach((recipient) => {
    emailQueue.add({ to: recipient, subject, text, html });
  });

  res.status(200).json({ message: "Emails ajoutés à la file." });
});

// Traiter la file
emailQueue.process(async (job) => {
  try {
    await sendMail(job.data);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
  }
});

module.exports = router;
