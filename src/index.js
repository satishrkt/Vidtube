import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv"; // import dotenv file in this format and add this line -r dotenv/config --experimental-json-modules package.josn file too;
import connectDB from "./db/dbConnection.js";

dotenv.config({
    path: './env'
})
const app = express();
const PORT = process.env.PORT || 8000;
connectDB().then(() =>{
    app.listen(PORT, () =>{
        console.log(`Server is running on port: ${PORT}`);
    });

    app.on("error", (error) =>{
        console.log("Database connection error: ", error);  
        throw error;      
    });
}).catch((error) =>{
    console.log("Database connection failed!!", error);
})