require("dotenv").config();
const express = require("express");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 3000;
const downloadTokens = new Map();

setInterval(() => {
  const now = Date.now();
  for (const [token, data] of downloadTokens.entries()) {
    if (now > data.expiresAt) downloadTokens.delete(token);
  }
}, 5 * 60 * 1000);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/verify-payment", async (req, res) => {
  const { reference } = req.body;
  if (!reference) return res.status(400).json({ success: false, message: "Reference required" });
  try {
    const r = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
    });
    const data = r.data;
    if (data.status && data.data.status === "success") {
      const token = uuidv4();
      downloadTokens.set(token, {
        reference,
        email: data.data.customer.email,
        expiresAt: Date.now() + 15 * 60 * 1000,
        used: false
      });
      return res.json({ success: true, downloadToken: token, customerEmail: data.data.customer.email });
    }
    return res.status(400).json({ success: false, message: "Payment not successful" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Verification failed" });
  }
});

app.get("/api/download/:token", (req, res) => {
  const tokenData = downloadTokens.get(req.params.token);
  if (!tokenData) return res.status(404).send("<h2>Invalid or expired download link.</h2>");
  if (tokenData.used) return res.status(403).send("<h2>This link has already been used.</h2>");
  if (Date.now() > tokenData.expiresAt) { downloadTokens.delete(req.params.token); return res.status(403).send("<h2>Link expired.</h2>"); }
  tokenData.used = true;
  const pdfPath = path.join(__dirname, "files", "email-automation-blueprint.pdf");
  if (!fs.existsSync(pdfPath)) return res.status(500).send("<h2>File not found. Contact support.</h2>");
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=Email-Automation-Blueprint.pdf");
  res.setHeader("Cache-Control", "no-store");
  res.sendFile(pdfPath);
});

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
