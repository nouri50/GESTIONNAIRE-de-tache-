import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendTestEmail = async () => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: 'jeubilleulloiwoi-8899@yopmail.com',  // Remplacez par votre email
    subject: 'Test Nodemailer',
    text: 'Ceci est un test pour vérifier Nodemailer.',
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email envoyé avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de test :', error);
  }
};

sendTestEmail();
