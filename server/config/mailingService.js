const nodemailer = require("nodemailer");
const mailUser = process.env.MAIL_USER;
const mailPass = process.env.MAIL_PASS;
const mailServer = process.env.MAILING_SERVER;
            
const transporter = nodemailer.createTransport({
  host: mailServer,
  port: 465,
  secure: true,
  auth: {
    user: mailUser,
    pass: mailPass,
  },
});

const mailSender = async (address,mail)=>{
        const info = await transporter.sendMail({
          from: mailUser, // sender address
          to: address, // list of receivers
          subject: "Study Notion", // Subject line
          text: "something", // plain text body
          html:mail , // html body
    });
    return info;
}

module.exports = mailSender;