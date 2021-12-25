import express from 'express';

const router = express.Router();

router.get('/', (req, res) => res.render('./chat-list'));

router.get('/:chat_id', (req, res) => {
  // 구매자와 판매자 개별 채팅창
});

router.post('/:chat_id', (req, res) => {
  // 첫 채팅 주고 받을 떄 채팅창 만들기
  // 채팅 주고 받는 것을 DB에 저장하는 곳
});

export default router;
