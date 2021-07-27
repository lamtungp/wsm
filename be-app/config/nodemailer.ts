import nodemailer from 'nodemailer';
import env from './env';

const { auth } = env;

const user = auth.user;
const pass = auth.pass;

const sendEmail = async (name: any, email: any, confirmationCode: any) => {
    // let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: user,
            pass: pass,
        },
    });

    transporter.verify(function (error) {
        // Nếu có lỗi.
        if (error) {
            console.log(error);
        } else {
            //Nếu thành công.
            console.log('Kết nối thành công!');
            const options = {
                from: user,
                to: email,
                subject: 'Please confirm your account',
                html: `<h1>Email Confirmation</h1>
                          <h2>Hello ${name}</h2>
                          <p>Thank you for subscribing. Please confirm your email by clicking on the following link:</p>
                          <a href=${process.env.API_CONFIRM_ENTRYPOINT}/${confirmationCode}> Click here</a>
                          </div>`,
            };

            transporter.sendMail(options, function (error, info) {
                if (error) {
                    // nếu có lỗi
                    console.log(error);
                } else {
                    //nếu thành công
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    });

    // console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};

export default sendEmail;
