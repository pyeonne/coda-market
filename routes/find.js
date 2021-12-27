import express from 'express';
import nodemailer from 'nodemailer';
import User from '../models/User.js';
import { nanoid } from 'nanoid';
import hashingPassword from '../utils/hash-password.js';
import SMTPTransport from 'nodemailer-smtp-transport';

const router = express.Router();

router.get('/id', (req, res) => res.render('./account/setid'));
router.get('/password', (req, res) => res.render('./account/setpwd'));

// localhost:3000/find/id
router.post('/id', async (req, res) => {
  let receiverEmail = req.body.email;

  const user = await User.findOne({
    email: receiverEmail,
  });

  let transporter = nodemailer.createTransport(
    SMTPTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: 'clsrns1111@gmail.com',
        pass: process.env.emailPassword,
      },
    }),
  );

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"CODA Team" <${'clsrns1111@gmail.com'}>`,
    to: user.email,
    subject: '코다마켓 - 아이디찾기 결과',
    text: 'test1123',
    html: `<b>코다마켓에서 보낸 이메일입니다.</b><p>아이디는 ${user.shortId} 입니다.</p>`,
  });

  res.redirect('login');
});

router.post('/password', async (req, res) => {
  let receiverEmail = req.body.email;
  let receiveruserId = req.body.id;
  const user = await User.findOne({
    email: receiverEmail,
    shortId: receiveruserId,
  });
  console.log(user);
  const newPwd = nanoid();

  await User.findOneAndUpdate(
    {
      $and: [{ email: receiverEmail }, { id: receiveruserId }],
    },
    {
      password: hashingPassword(newPwd),
    },
    { new: true },
  );

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'clsrns1111@gmail.com',
      pass: process.env.emailPassword,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"CODA Team" <${'clsrns1111@gmail.com'}>`,
    to: receiverEmail,
    subject: '코다마켓 - 비밀번호찾기 결과',
    text: 'test1123',
    html: `<b>(주)코다마켓에서 보낸 이메일입니다.</b><p>비밀번호는 ${newPwd} 입니다. </p>
    <a href='http://elice-kdt-sw-1st-vm09.koreacentral.cloudapp.azure.com/'> ▶ 코다마켓으로 바로가기 </a>
    `,
  });

  res.redirect('/login');
});

export default router;
