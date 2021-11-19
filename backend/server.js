const app = require('./app');
const connectDatabase = require('./config/database');
const dotenv = require('dotenv');
const cloudinary= require("cloudinary");
const port = 8000;

//Config
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
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
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