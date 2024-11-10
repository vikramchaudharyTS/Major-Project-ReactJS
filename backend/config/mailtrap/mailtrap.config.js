import { MailtrapClient } from "mailtrap";
import dotenv from 'dotenv' 
dotenv.config()
import nodemailer from 'nodemailer'

const TOKEN = process.env.MAILTRAP_TOKEN;


const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: ,
      pass: "jn7jnAPss4f63QBp6D",
    },
  });

export const mailtrapClient = new MailtrapClient({
    token: TOKEN,
});

export const sender = {
    email: "hello@demomailtrap.com",
    name: "Vikram Chaudhary",
};

// const recipients = [
//     {
//         email: "theunofficialvikram@gmail.com",
//     }
// ];

// mailtrapClient
//     .send({
//         from: sender,
//         to: recipients,
//         subject: "You are awesome!",
//         text: "Congrats for sending test email with Mailtrap!",
//         category: "Integration Test",
//     })
//     .then(console.log, console.error);