import express from 'express';
import nodemailer from 'nodemailer';
import User from '../models/User.js';

const router = express.Router();

// localhost:3000/user/find/id
router.post('/id', async (req, res) => {
  let receiverEmail = req.body.email;

  const user = await User.findOne({
    email: receiverEmail,
  });

  console.log(user);
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'clsrns1111@gmail.com',
      pass: process.env.emailPassword,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"CODA Team" <${'clsrns1111@gmail.com'}>`,
    to: user.email,
    subject: '코다마켓 - 아이디찾기 결과',
    text: 'test1123',
    html: `<b>코다마켓에서 보낸 이메일입니다.</b><p>아이디는 ${user.name} 입니다. </p>`,
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  res.json({
    status: 'Success',
    code: 200,
    message: 'Sent Auth Email',
  });
});

router.post('/password', async (req, res) => {
  let receiverEmail = req.body.email;
  let receiveruserId = req.body.id;
  console.log(receiverEmail);
  const user = await User.findOne({
    email: receiverEmail,
    shortId: receiveruserId,
  });

  const userPwd = user.pwd;
  const decipher = crypto.createDecipher('aes-256-cbc', '열쇠');

  let result2 = decipher.update(userPwd, 'base64', 'utf8');
  result2 += decipher.final('utf8');
  console.log(result2);

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'clsrns1111@gmail.com',
      pass: process.env.emailPassword,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"CODA Team" <${'clsrns1111@gmail.com'}>`,
    to: 'clsrns1111@gmail.com',
    subject: '코다마켓 - 비밀번호찾기 결과',
    text: 'test1123',
    html: `<b>코다마켓에서 보낸 이메일입니다.</b><p>비밀번호는 ${user.pwd} 입니다. </p>`,
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  res.json({
    status: 'Success',
    code: 200,
    message: 'Sent Auth Email',
  });
});

export default router;
