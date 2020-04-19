const router = require('express').Router();

const adminLoginController = require('../controllers/adminLoginController');

router.get('/', adminLoginController.index);

module.exports = router;
