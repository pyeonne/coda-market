import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('./first');
});

router.get('/login', (req, res) => {
  res.render('./account/login');
});

router.post('/logout', (req, res) => {
  res.cookie('token', null, { maxAge: 0 }).redirect('/login');
});

// 테스트 완료 후 수정할 것
router.get('/chat', (req, res) => res.render('./chat-list'));
router.get('/chats/:post_id', (req, res) => res.render('./chat'));

router.get('/category', (req, res) => {
  res.render('./category', { userLocation: req.query.location });
});

export default router;
