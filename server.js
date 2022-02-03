const express  = require('express');
const dotenv = require('dotenv');

//Ucitavanje env varijabli iz config.env
dotenv.config({ path : './config/config.env' });

// Path za rutere
const bootcamps = require('./routes/bootcamps');

const app = express();

//Mount rutera
app.use('/api/v1/bootcamps' , bootcamps);

const PORT = process.env.PORT || 5000

// Pokrecem server
app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

