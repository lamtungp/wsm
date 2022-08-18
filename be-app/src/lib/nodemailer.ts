import nodemailer from 'nodemailer';
import { Job } from 'bull';
import config from '../../config';

const { mail } = config;

const emailProcess = async (job: Job) => {
  const transporter = nodemailer.createTransport({
    host: mail.host,
    port: Number(mail.port),
    secure: false, // true for 465, false for other ports
    tls: {
      rejectUnauthorized: false,
    },
  });
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
