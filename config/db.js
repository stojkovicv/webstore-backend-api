const mongoose = require("mongoose");

// Glavna konekcija
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`Mongo DB is connected: ${conn.connection.host}`.blue.bold.underline);
};

    module.exports = connectDB;

