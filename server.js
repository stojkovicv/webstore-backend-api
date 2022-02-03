const express  = require('express');
const dotenv = require('dotenv');

//Ucitavanje env varijabli da bismo koristili config.env

dotenv.config({ path : './config/config.env' });

const app = express();

const PORT = process.env.PORT || 5000

// Pokrecem server

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

