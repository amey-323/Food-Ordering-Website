const app = require('./app');

const connectDatabase = require('./config/database');
const dotenv = require('dotenv');
const cloudinary= require("cloudinary");
const port = 8000;
dotenv.config({ path: "./config/config.env" });


// Handling uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
})

// Connection to Database
connectDatabase();
cloudinary.config({
    cloud_name: 'foodweb',
    api_key: '223783874126439',
    api_secret: 'pZ2cX17MxmnohLs9Hx6Kyy-TbuY',
});

const server=app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})

//Handling Unhandled Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);

    server.close(() => {
        process.exit(1)
    })
})