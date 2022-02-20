const express  = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

//Ucitavanje env varijabli iz config.env
dotenv.config({ path : './config/config.env' });

//Konektovanje na mongo
connectDB();

// Path za rutere
const bootcamps = require('./routes/bootcamps');

const app = express();

// Body parser
app.use(express.json()); 

// Dev logging middleware
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//Mount rutera
app.use('/api/v1/bootcamps' , bootcamps);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Pokrecem server
const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

//Prekid rada ako nije povezano sa bazom
process.on('unhandledRejection', (err, promise) =>{
    console.log(`Greska!: ${err.message}`.red);
    //Zatvoriti sve ako se dogodi
    server.close(() => process.exit(1));
})