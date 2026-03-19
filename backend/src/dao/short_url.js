import urlschema from "../model/short_url.model.js";

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
    try {
        const newUrl = new urlschema({
            full_url: longUrl,
            short_url: shortUrl,
            clicks: 0,
        });

        if (userId) {
            newUrl.user_id = userId;
        }

        await newUrl.save(); // IMPORTANT
        return newUrl;

    } catch (err) {
        throw err;
    }
};

export const findUrlFromShortUrl = async (shortUrl) => {
    return await urlschema.findOneAndUpdate(
        { short_url: shortUrl },
        { $inc: { clicks: 1 } },
        { new: true }
    );
};