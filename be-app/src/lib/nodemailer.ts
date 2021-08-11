import nodemailer from 'nodemailer';
import email from '../../config/email';

const { auth } = email;
const { mail } = email;

const sendEmail = async (name: string, email: string, password: string, confirmationCode: any, path: any) => {
  const transporter = nodemailer.createTransport({
    host: mail.host,
    service: mail.service,
    port: Number(mail.port),
    secure: false, // true for 465, false for other ports
    auth: {
      user: auth.user,
      pass: auth.pass,
    },
  });

  transporter.verify(function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log('Kết nối thành công!');
      const options = {
        from: auth.user,
        to: email,
        subject: 'Please confirm your account',
        html: `<div>
                  <h1>Email Confirmation</h1>
                  <h2>Hello ${name}</h2>
                  <p>Thank you for subscribing.</p>
                  <p>Email: ${email}</p>
                  <p>Password: ${password}</p>
                  <p>Please confirm your email by clicking on the following link:</p>
                  <a href=${path}/${confirmationCode}> Click here</a>
              </div>`,
      };

      transporter.sendMail(options, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }
  });
};

export default sendEmail;
