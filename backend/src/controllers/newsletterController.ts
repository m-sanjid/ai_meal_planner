import Newsletter from "../models/Newsletter";
import { Request, Response } from "express";
import nodemailer from "nodemailer";

export const subscribeToNewsletter = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ error: "Email is required" });
    return;
  }

  try {
    // Save to MongoDB
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      res.status(409).json({ error: "Email already subscribed" });
      return;
    }

    await Newsletter.create({ email });

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Newsletter Bot" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: "New Newsletter Subscriber",
      html: `<p><strong>Email:</strong> ${email}</p>`,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "🎉 You're subscribed to BefitAi – Welcome aboard!",
      html: `
          <div style="font-family: sans-serif; color: #333; padding: 20px;">
            <h2 style="color: #2ecc71;">Welcome to BefitAi!</h2>
            <p>Thank you for subscribing to our newsletter. We're excited to have you join our health-conscious community!</p>
      
            <p><strong>BefitAi</strong> is your smart meal planning companion — designed to help you eat healthier, save time, and stay consistent on your wellness journey.</p>
      
            <p>👉 Visit our website to explore more: <a href="https://befitai.sanjid.shop" target="_blank" style="color: #2ecc71;">befitai.sanjid.shop</a></p>
      
            <hr style="margin: 24px 0;" />
      
            <p>If you have any questions or feedback, feel free to reply to this email. We'd love to hear from you!</p>
      
            <p>Stay fit and eat smart,</p>
            <p><strong>– The BefitAi Team</strong></p>
          </div>
        `,
    });

    res.status(200).json({ message: "Subscribed successfully" });
    return;
  } catch (err) {
    console.error("Subscription error:", err);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};
