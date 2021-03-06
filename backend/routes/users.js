const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/users');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/', auth, userCtrl.delete);

module.exports = router;