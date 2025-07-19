import dotenv from "dotenv"; // import dotenv file in this format and add this line -r dotenv/config --experimental-json-modules package.josn file too;
import connectDB from "./db/dbConnection.js";
import { app } from "./app.js";

dotenv.config({
    path: './env'
});

const PORT = process.env.PORT || 3000;
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
});