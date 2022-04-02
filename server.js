const path = require('path');
const express  = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

//Ucitavanje env varijabli iz config.env
dotenv.config({ path : './config/config.env' });

//Konektovanje na mongo
connectDB();

// Path za rutere
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const users = require('./routes/users');
const reviews = require('./routes/reviews');


const app = express();

// Body parser
app.use(express.json()); 

// Cookie
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// Photo uploading
app.use(fileupload());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Mount rutera
app.use('/api/v1/bootcamps' , bootcamps);
app.use('/api/v1/courses' , courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);


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