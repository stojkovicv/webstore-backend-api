const express = require('express');
const { registrejsn, login, getMe, forgotPassword } = require('../controllers/auth');

const router = express.Router();

const {protect} = require('../middleware/auth');

router.post('/registrejsn', registrejsn);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/forgotpassword', forgotPassword);


module.exports = router;