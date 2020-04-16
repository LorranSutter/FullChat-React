const router = require('express').Router();

const adminLoginController = require('../controllers/adminLoginController');

router.get('/', adminLoginController.index);

// router.get('/index', loginController.index);

// router.get('/login', loginController.index);

module.exports = router;
