import express from "express";
const app = express();
import dotenv from "dotenv";//importing dotenv to load environment variables from a .env file
dotenv.config();//load environment variables from .env file
import {nanoid} from "nanoid";
import connectDB from "./src/config/mongo.config.js";//importing the connectDB function to connect to MongoDB
import urlschema from "./src/shorturl.model.js";//importing the urlschema to interact with the shorturls collection in MongoDB

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//use get for redirecting to the original url

//use post for creating a new short url
app.post("/api/create", async(req, res)=>{
    console.log("api hit")
    const {url} = req.body;//get the original url from the request body
    console.log("url recieved", url)
    const shortUrl = nanoid(7);//generate a unique short URL using nanoid with a length of 7 characters
    const newUrl = new urlschema({
        full_url: url,
        short_url: shortUrl,
        clicks: 0, 
      
    })
    const saved = await newUrl.save();//save new short URL to database
    console.log("Saved:", saved);
    res.send({shortUrl});//send the generated short URL back to the client in the response
});

//get request to redirect to the original url
app.get("/api/:shortUrl",async(req, res)=>{
    const{shortUrl} = req.params;//get the short URL from the request parameters    
    const url = await urlschema.findOne({short_url: shortUrl});//find the corresponding full URL in the database using the short URL
    if(url){
        res.redirect(url.full_url);//redirect the user to the original URL if found
    }
    else{
        res.status(404).send("URL not found");//send a 404 error if the short URL is not found in the database
    }
})
app.listen(3000, () => {
    connectDB();//connect to MongoDB when the server starts
  console.log("Server is running on port 3000");
}) ;
