const express = require("express");
const { Template, RecipientList } = require("../models");

const router = express.Router();

// Routes pour les templates
router.post("/templates", async (req, res) => {
  const { name, subject, content } = req.body;
  const template = await Template.create({ name, subject, content });
  res.json(template);
});

router.get("/templates", async (req, res) => {
  const templates = await Template.findAll();
  res.json(templates);
});

// Routes pour les listes de destinataires
router.post("/recipient-lists", async (req, res) => {
  const { name, recipients } = req.body;
  const recipientList = await RecipientList.create({
    name,
    recipients: JSON.stringify(recipients),
  });
  res.json(recipientList);
});

router.get("/recipient-lists", async (req, res) => {
  const lists = await RecipientList.findAll();
  res.json(lists);
});

module.exports = router;
