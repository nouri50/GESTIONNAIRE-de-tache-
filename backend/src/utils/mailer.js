import nodemailer from 'nodemailer';

export const sendResetEmail = async (email, resetLink) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Réinitialisation de votre mot de passe',
    text: `Cliquez sur le lien suivant pour réinitialiser votre mot de passe : ${resetLink}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email envoyé avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email :', error);
    throw new Error('Échec de l\'envoi de l\'email.');
  }
};
