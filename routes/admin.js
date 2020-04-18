const router = require('express').Router();

const adminController = require('../controllers/adminController');
const adminMiddleware = require('../middlewares/adminAuth');

router.get('/', adminMiddleware.checkLogin, adminController.index);

router.post('/', adminMiddleware.newLogin, adminController.index);

router.get('/partialHistory', adminMiddleware.checkLogin, adminController.partialHistory);

router.get('/socketEvents', adminMiddleware.checkLogin, adminController.socketEvents);

module.exports = router;
