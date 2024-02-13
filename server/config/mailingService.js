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

//{
// accepted: [ 'email of reciver' ],
//  rejected: [],
//  envelopeTime: 1102,
//  messageTime: 824,
//  messageSize: 2632,
//  response: '250 2.0.0 OK  1707769536 e14-20020aa78c4e000000b006e091489776sm6140274pfd.92 - gsmtp',
//  envelope: {
//    from: 'my email',
//    to: ['email of reciver']
//  },
//  messageId: '<6e05d5af-e722-000c-5d29-71b6b921754b@gmail.com>'
//}
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