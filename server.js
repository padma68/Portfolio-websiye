import express from "express";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve your portfolio (if in same server)
app.use(express.static("public"));

// Contact Route
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",   // or use your SMTP provider
      auth: {
        user: "your-email@gmail.com",   // replace with your email
        pass: "your-app-password"       // use Gmail App Password, not account password
      }
    });

    // Email options
    const mailOptions = {
      from: email,
      to: "your-email@gmail.com",       // where you want to receive messages
      subject: `New message from ${name}`,
      text: `From: ${name} (${email})\n\n${message}`
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Thanks! Your message has been sent 🚀" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong. Try again!" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
