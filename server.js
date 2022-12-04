const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

const { MONGO_DB_HOST } = process.env;

const start = async () => {
    try {
        await mongoose.connect(MONGO_DB_HOST);
        console.log("Database connection successful");

        app.listen(3000, () => {
            console.log("Server running. Use our API on port: 3000");
        });
    }
    catch (error) {
        console.error(`Failed to start server: ${error.message}`);
        process.exit(1);
    }
}

start();