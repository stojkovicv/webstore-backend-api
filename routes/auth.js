const express = require('express');
const { registracija } = require('../controllers/auth');

const router = express.Router();

router.post('/registracija', registracija);

module.exports = router;