import mongoose from 'mongoose';

const shortUrlSchema = new mongoose.Schema({
    full_url: {
        type: String,
        required: true,
    },
    short_url: {
        type: String,
        required: true,
        index:true,//create an index on the short_url field to improve query performance when looking up short URLs(b-tree banta hai)
        unique: true,//ensure that each short URL is unique in the database, preventing duplicate entries and ensuring that each short URL maps to a single full URL
    },
   clicks:{
        type: Number,
        required: true,
        default: 0,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
       
    }//circular refrence nahi krni chahiye
   
});//define a Mongoose schema for the short URL, which includes fields for the full URL, the short URL, the number of clicks, and a reference to the user who created it

const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);//create a Mongoose model named ShortUrl using the shortUrlSchema, which will be used to interact with the shorturls collection in MongoDB

export default ShortUrl;