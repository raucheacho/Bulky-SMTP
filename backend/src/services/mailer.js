const nodemailer = require("nodemailer");
const smtpConfig = require("../config/smtp");

const transporter = nodemailer.createTransport(smtpConfig);

const sendMail = async ({ to, subject, text, html }) => {
  const mailOptions = {
    from: `"Mon Service" <${smtpConfig.auth.user}>`,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email envoyé : ", info.messageId);
    return info;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    throw error;
  }
};

module.exports = { sendMail };
