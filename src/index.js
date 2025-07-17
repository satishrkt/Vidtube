import mongoose from "mongoose";
// import express from "express";
import dotenv from "dotenv"; // import dotenv file in this format and add this line -r dotenv/config --experimental-json-modules package.josn file too;
import connectDB from "./db/dbConnection.js";

dotenv.config({
    path: './env'
})
// const app = express();
connectDB();