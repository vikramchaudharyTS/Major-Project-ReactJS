//@ts-nocheck
import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js"
import { transporter } from "./nodemailer.config.js"
import dotenv from 'dotenv' 

dotenv.config()

// Function to send verification email
export const sendVerificationEmail = async (email, verificationToken) => {
    const recipients = [{ email }]
    try {
        const response = await transporter.sendMail({
            from: process.env.EMAIL_AUTH_USER,  // Sender email from .env
            to: email,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })
        console.log("Verification Email sent successfully", response);
    } catch (error) {
        console.log("EF-B/sendVerificationEmail ", error.message);
    }
}

// Function to send welcome email
export const sendWelcomeEmail = async (email, name) => {
    const recipients = [{ email }]
    try {
        const response = await transporter.sendMail({
            from: process.env.EMAIL_AUTH_USER,  // Sender email from .env
            to: email,
            subject: "Welcome to the Secret Room",
            html: `<h1>Welcome, ${name}!</h1><p>Thank you for joining our community.</p>`,
            category: "Welcome"
        })
        console.log("Welcome Email sent successfully", response);
    } catch (error) {
        console.log("EF-B/sendWelcomeEmail", error.message);
    }
}

// Function to send password reset email
export const sendPasswordResetEmail = async (email, url) => {
    const recipients = [{ email }]
    try {
        const response = await transporter.sendMail({
            from: process.env.EMAIL_AUTH_USER,  // Sender email from .env
            to: email,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", url),
            category: "Password Reset"
        })
        console.log("Reset password email sent successfully", response);
    } catch (error) {
        console.log("EF-B/sendPasswordResetEmail ", error.message);
    }
}

// Function to send password reset success email
export const resetPasswordSuccessEmail = async (email) => {
    const recipients = [{ email }]
    try {
        const response = await transporter.sendMail({
            from: process.env.EMAIL_AUTH_USER,  // Sender email from .env
            to: email,
            subject: "Reset password successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"
        })
        console.log("Password reset success email sent successfully", response);
    } catch (error) {
        console.log("EF-B/resetPasswordSuccessEmail ", error.message);
    }
}

