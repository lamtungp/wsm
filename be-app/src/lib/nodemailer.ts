import nodemailer from 'nodemailer';
import { Job } from 'bull';
import email from '../../config/email';

const { auth } = email;
const { mail } = email;

const emailProcess = async (job: Job) => {
  const transporter = nodemailer.createTransport({
    host: mail.host,
    service: mail.service,
    port: Number(mail.port),
    secure: false, // true for 465, false for other ports
    auth: {
      user: auth.user,
      pass: auth.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  // name: string, email: string, password: string, confirmationCode: any, path: any
  try {
    await transporter.verify();
    console.log('Kết nối thành công!');
  } catch (error) {
    console.log(error.message);
  }
  const info = await transporter.sendMail(job.data);
  console.log('Email sent: ' + info.response);
  return nodemailer.getTestMessageUrl(info);
};

export { emailProcess };
