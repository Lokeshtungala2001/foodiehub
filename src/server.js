// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const accountSid = "YOUR_TWILIO_SID";        // Replace with your Twilio SID
const authToken = "YOUR_TWILIO_AUTH_TOKEN";  // Replace with your Twilio Auth Token
const client = twilio(accountSid, authToken);

let otpStore = {}; // Store OTPs temporarily: { phone: { otp, expiresAt } }

// Endpoint to send OTP
app.post("/send-otp", async (req, res) => {
  const { phone } = req.body;

  if (!phone) return res.status(400).json({ success: false, message: "Phone number required" });

  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
  otpStore[phone] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // expires in 5 min

  try {
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: "+1234567890", // Replace with your Twilio number
      to: phone // Include country code e.g., +91XXXXXXXXXX
    });
    res.json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Endpoint to verify OTP
app.post("/verify-otp", (req, res) => {
  const { phone, otp } = req.body;
  const record = otpStore[phone];

  if (!record) return res.status(400).json({ success: false, message: "No OTP sent" });
  if (record.expiresAt < Date.now()) return res.status(400).json({ success: false, message: "OTP expired" });
  if (record.otp != otp) return res.status(400).json({ success: false, message: "Invalid OTP" });

  delete otpStore[phone];
  res.json({ success: true, message: "OTP verified" });
});

app.listen(5000, () => console.log("OTP server running on port 5000"));
