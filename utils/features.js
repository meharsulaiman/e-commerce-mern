import DataUriParser from 'datauri/parser.js';
import path from 'path';
import { createTransport } from 'nodemailer';

export const getDataUri = (file) => {
  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString();

  return parser.format(extName, file.buffer);
};

export const sendToken = (user, res, statusCode, message) => {
  const token = user.generateToken();

  res
    .status(statusCode)
    .cookie('token', token, {
      ...cookieOptions,
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    })
    .json({
      success: true,
      message: message,
      data: user,
    });
};

export const cookieOptions = {
  secure: process.env.NODE_ENV === 'development' ? false : true,
  httpOnly: process.env.NODE_ENV === 'development' ? false : true,
  sameSite: process.env.NODE_ENV === 'development' ? false : 'none',
};

export const sendEmail = async (subject, to, text) => {
  // const transporter = createTransport({
  //   host: process.env.SMTP_HOST,
  //   port: process.env.SMTP_PORT,
  //   auth: {
  //     user: process.env.SMTP_USER,
  //     pass: process.env.SMTP_PASS,
  //   },
  // });
  const transporter = createTransport({
    service: 'Gmail',
    auth: {
      user: 'dr.love9026@gmail.com',
      pass: 'lukfshfotizjxhhn',
    },
  });

  await transporter.sendMail({ to, subject, text });
};