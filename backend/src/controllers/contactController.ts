import nodemailer from "nodemailer";
import { Request, Response } from "express";

export const sendContactEmail = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL,
      subject: `New Contact Form: ${subject}`,
      html: `
                <h3>Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong> ${message}</p>
            `,
    });

    res.status(200).json({ message: "Message sent and saved" });
    return;
  } catch (error) {
    console.error("Send Error:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
