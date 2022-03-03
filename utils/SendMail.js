const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();
const MailHandler = async ({ email, subject, message, access_token }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: access_token,
    },
  });

  const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    text: message + " " + verificationToken,
  };

  try {
    const mailSentInfo = await transporter.sendMail(mailOptions);
    console.log("mailSentInfo", mailSentInfo);
    transporter.close();
    return true;
  } catch (error) {
    console.log("error", error);
    return false;
  }
};

module.exports = { MailHandler };
