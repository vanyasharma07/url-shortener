import { generateNanoId } from "../utils/helper.js";

import { saveShortUrl } from "../dao/short_url.js";

export const createshortUrlServiceWithoutUser = async (url) =>{
    const shortUrl = generateNanoId(7);
    if(!shortUrl) throw new Error("Failed to generate short URL");
    await saveShortUrl(shortUrl, url);//from dao
    return shortUrl;//send the generated short URL back to the client in the response
}

export const createshortUrlServiceWithUser = async (url,userId) =>{
    const shortUrl = generateNanoId(7);//generate a unique short URL using nanoid with a length of 7 characters
    await saveShortUrl(shortUrl, url, userId);//from dao
    return shortUrl;//send the generated short URL back to the client in the response
}