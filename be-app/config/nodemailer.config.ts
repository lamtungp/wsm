import nodemailer from 'nodemailer';
import env from './env';

const { auth } = env;

const user = auth.user;
const pass = auth.pass;

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: user,
        pass: pass,
    },
});

module.exports.sendConfirmationEmail = (name: any, email: any, confirmationCode: any) => {
    console.log('Check');
    transport
        .sendMail({
            from: user,
            to: email,
            subject: 'Please confirm your account',
            html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=http://pm.local/confirm/${confirmationCode}> Click here</a>
          </div>`,
        })
        .catch((err: any) => console.log(err));
};
