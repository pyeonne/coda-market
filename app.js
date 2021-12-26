/* import */
import express from 'express';
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import signupRouter from './routes/signup.js';
import authRouter from './routes/auth.js';
import postRouter from './routes/posts.js';
import cartRouter from './routes/cart.js';
import homeRouter from './routes/home.js';
import profileRouter from './routes/profile.js';
import chatsRouter from './routes/chats.js';
import passport from 'passport';
import passportInit from './passport/index.js';
import getUserFromJwt from './passport/middlewares/get-user-from-jwt.js';
import dotenv from 'dotenv';
import path from 'path';
import findRouter from './routes/find.js';
import fs from 'fs';
import http from 'http';
import createSocketServer from './socket/create-server.js';

passportInit();

/* setting */
dotenv.config();

const app = express();
const server = http.createServer(app);
createSocketServer(server);

const __dirname = path.resolve();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname + '/static'));
app.use('/uploads', express.static('uploads'));

app.use(passport.initialize());
app.use(getUserFromJwt);

app.use('/', homeRouter);
app.use('/signup', signupRouter);
app.use('/auth', authRouter);
app.use('/posts', postRouter);
app.use('/profile', profileRouter);
app.use('/cart', cartRouter);
app.use('/find', findRouter);
app.use('/chats', chatsRouter);
// app.use('/conversation', conversationRouter);

/* server */
const start = () => {
  try {
    /* DB */
    connectDB(process.env.MONGODB);
    server.listen(process.env.PORT || 3000, () => {
      // 업로드될 파일을 저장할 폴더 생성
      const dir = './uploadedFiles';

      if (!fs.existsSync(dir)) fs.mkdirSync(dir);
      console.log(`Example app listening on port ${process.env.PORT || 3000}!`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
