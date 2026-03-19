
import { createshortUrlServiceWithoutUser } from '../services/short_url.service.js';
import { findUrlFromShortUrl } from '../dao/short_url.js';

export const createShortUrl = async(req, res)=>{
        console.log("api hit")
        try{
        const {url} = req.body;//get the original url from the request body
        console.log("url recieved", url);
        //now we'll use the service function to create a short URL and save it to the database
        const shortUrl = await createshortUrlServiceWithoutUser(url);
        res.send(process.env.APP_URL + shortUrl);
        }
        catch(err){
           next(err);
        }
    }

export const redirectFromShortUrl = async(req, res)=>{
    const{shortUrl} = req.params;//get the short URL from the request parameters    
    const url = await findUrlFromShortUrl(shortUrl);//find the original URL from the database using dao
    if(url){
        res.redirect(url.full_url);//redirect the user to the original URL if found
    }
    else{
        res.status(404).send("URL not found");//send a 404 error if the short URL is not found in the database
    }
}