import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: "16kb"})); // for recieve JSON data from the server and max limit is 16kb 
app.use(express.urlencoded({extended: true, limit: "16kb"})) // fetch data from url
app.use(express.static("public")); // for avialble static data in publically
app.use(cookieParser());
export { app }
