import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export const sendResetEmail = (to, resetLink) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: to,
    subject: 'Réinitialisation de mot de passe',
    text: `Cliquez sur le lien suivant pour réinitialiser votre mot de passe : ${resetLink}`,
  };

  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Erreur lors de l\'envoi de l\'email:', error);
    } else {
      console.log('E-mail envoyé avec succès:', info.response);
    }
  });
};
