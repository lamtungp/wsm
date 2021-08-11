const auth = {
  secret: process.env.JWT_SECRET,
  user: process.env.MAIL_USERNAME,
  pass: process.env.MAIL_PASSWORD,
};

const mail = {
  host: process.env.MAIL_HOST,
  service: process.env.MAIL_SERVICE,
  port: process.env.MAIL_PORT,
  driver: process.env.MAIL_DRIVER,
};

export default {
  auth,
  mail,
};
