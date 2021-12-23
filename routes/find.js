import express from 'express';
import nodemailer from 'nodemailer';
import User from '../models/User.js';
import { nanoid } from 'nanoid';

const router = express.Router();

router.get('/id', (req, res) => res.render('./account/setId'));
router.get('/pwd', (req, res) => res.render('./account/setpwd'));

// localhost:3000/find/id
router.post('/id', async (req, res) => {
  let receiverEmail = req.body.email;

  const user = await User.findOne({
    email: receiverEmail,
  });

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
    html: `<b>코다마켓에서 보낸 이메일입니다.</b><p>아이디는 ${user.name} 입니다.</p>`,
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  res.json({
    status: 'Success',
    code: 200,
    message: 'Sent Auth Email',
  });
});

router.post('/pwd', async (req, res) => {
  let receiverEmail = req.body.email;
  let receiveruserId = req.body.id;
  console.log(receiverEmail);
  console.log(receiveruserId);
  const user = await User.findOne({
    email: receiverEmail,
    shortId: receiveruserId,
  });

  const newPwd = nanoid();

  await User.findOneAndUpdate(
    {
      $and: [{ email: receiverEmail }, { id: receiveruserId }],
    },
    {
      pwd: newPwd,
    },
    { new: true },
  );

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
  console.log('ddddd');
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"CODA Team" <${'clsrns1111@gmail.com'}>`,
    to: receiverEmail,
    subject: '코다마켓 - 비밀번호찾기 결과',
    text: 'test1123',
    html: `<b>(주)코다마켓에서 보낸 이메일입니다.</b><p>비밀번호는 ${newPwd} 입니다. </p>
    <a href='http://localhost:3000'> ▶ 코다마켓으로 바로가기 </a>
    `,
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
