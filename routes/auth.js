const express = require('express');
const { registracija, login, getMe } = require('../controllers/auth');

const router = express.Router();

const {protect} = require('../middleware/auth');

router.post('/registracija', registracija);
router.post('/login', login);
router.get('/me', protect, getMe);


module.exports = router;