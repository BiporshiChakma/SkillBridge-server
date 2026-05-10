import { betterAuth, string } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
// If your Prisma file is located elsewhere, you can change the path

const nodemailer = require("nodemailer");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  trustedOrigins: [process.env.APP_URL!],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification:true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
        const info = await transporter.sendMail({
          from: '"Skill Bridge" <skillbridge@gmail.com>', // sender address
          to: user.email, // list of recipients
          subject: "Please verify your email", // subject line
          html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Skill Bridge Email Verification</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background:#f4f6f8;">

  <div style="max-width:600px; margin:40px auto; background:#ffffff; padding:30px; border-radius:10px; box-shadow:0 2px 10px rgba(0,0,0,0.1);">

    <h2 style="color:#2d3748; text-align:center;">
      🚀 Skill Bridge
    </h2>

    <p style="font-size:16px; color:#4a5568;">
      Hello, ${user.name}
    </p>

    <p style="font-size:16px; color:#4a5568;">
      Thank you for joining <strong>Skill Bridge</strong>. Please verify your email address to activate your account.
    </p>

    <div style="text-align:center; margin:30px 0;">
      <a href="${verificationUrl}"
        style="background:#4f46e5; color:#ffffff; padding:12px 25px; text-decoration:none; border-radius:6px; font-size:16px; display:inline-block;">
        Verify Email
      </a>
    </div>

    <p style="font-size:14px; color:#718096;">
      If the button doesn’t work, copy and paste this link into your browser:
    </p>

    <p style="font-size:12px; color:#4a5568; word-break:break-all;">
      ${verificationUrl}
    </p>

    <hr style="margin:30px 0;" />

    <p style="font-size:12px; color:#a0aec0; text-align:center;">
      © ${new Date().getFullYear()} Skill Bridge. All rights reserved.
    </p>

  </div>

</body>
</html>`,
        });
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },
   socialProviders: {
        google: { 
              prompt: "select_account consent", 
              accessType:"offline",
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
});
