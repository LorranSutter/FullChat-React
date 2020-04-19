const router = require('express').Router();

const auth = require('../middlewares/auth');
const chatController = require('../controllers/chatController');

router.get('/:roomId', auth, chatController.index);

module.exports = router;
