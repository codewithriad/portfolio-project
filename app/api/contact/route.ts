import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message, honeypot } = body;

    // 1. Anti-Spam: Honeypot Check
    if (honeypot) {
      console.warn("Spam detected: Honeypot field filled.");
      return NextResponse.json(
        { message: "Spam detected." },
        { status: 400 }
      );
    }

    // 2. Server-side validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    // 3. Configure Nodemailer (Gmail example)
    console.log("Checking ENV:", { 
      hasUser: !!process.env.EMAIL_USER, 
      hasPass: !!process.env.EMAIL_PASS 
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify transporter connection
    try {
      await transporter.verify();
      console.log("Transporter is ready");
    } catch (verifyError) {
      console.error("Transporter verification failed:", verifyError);
      throw verifyError; // Triggers the main catch block
    }

    // 4. Email setup
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || "info@riyadkhan.dev",
      replyTo: email,
      subject: `[Portfolio Contact] ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}
Subject: ${subject}

Message:
${message}
      `,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #3b82f6;">New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    };

    // 5. Send Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Message sent safely! I'll get back to you soon." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Nodemailer error detailed:", error);
    
    // Handle specific nodemailer errors if needed
    if (error.code === 'EAUTH') {
      return NextResponse.json(
        { message: "Server configuration error: Authentication failed." },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: "Oops! Something went wrong on our end. Please try again later." },
      { status: 500 }
    );
  }
}
