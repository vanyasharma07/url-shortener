import express from "express";
const app = express();
import dotenv from "dotenv";//importing dotenv to load environment variables from a .env file
dotenv.config();//load environment variables from .env file
import {nanoid} from "nanoid";
import connectDB from "./src/config/mongo.config.js";//importing the connectDB function to connect to MongoDB
import urlschema from "./src/model/short_url.model.js";//importing the urlschema to interact with the shorturls collection in MongoDB
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
//modularising the code
import short_url_route from "./src/routes/short_url.route.js";
import { errorHandler } from "./src/utils/errorHandler.js";

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//use get for redirecting to the original url

app.use("/api/create", short_url_route);//use the short_url_route for handling requests to create short URLs at the /api/create endpoint

//get request to redirect to the original url
app.get("/:shortUrl", redirectFromShortUrl)

//error handler
app.use(errorHandler)
app.listen(3000, () => {
    connectDB();//connect to MongoDB when the server starts
  console.log("Server is running on port 3000");
}) ;
