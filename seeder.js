const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

const Bootcamp = require('./models/Bootcamps.js');
const Course = require('./models/course.js');

//Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'));


// Import
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);
        await Course.create(courses);
        console.log('Data has been imported...'.green.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
}


// Deleting the data
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();        
        await Course.deleteMany();
        console.log('Data has been removed...'.red.inverse)
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

if (process.argv[2] === '-i'){
    importData();
} else if(process.argv[2] === '-d'){
    deleteData();
};
