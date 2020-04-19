const router = require('express').Router();

const loginController = require('../controllers/loginController');

router.get('/', loginController.index);

router.get('/index', loginController.index);

router.get('/login', loginController.index);

module.exports = router;
