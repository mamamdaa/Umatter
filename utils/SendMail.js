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

  const verificationToken = jwt.sign({ email: email }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  let url = null;
  if (process.env.NODE_ENV === "production") {
    url = process.env.LINK + "/verification/" + verificationToken;
  } else {
    url = "http://localhost:3000/verification/" + verificationToken;
  }

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    text: message + " " + url,
  };

  try {
    const mailSentInfo = await transporter.sendMail(mailOptions);
    transporter.close();
    return true;
  } catch (error) {
    console.log("error", error);
    return false;
  }
};

module.exports = { MailHandler };
