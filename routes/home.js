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

router.get('/category', (req, res) => {
  res.render('./category', { userLocation: req.query.location });
});

export default router;
