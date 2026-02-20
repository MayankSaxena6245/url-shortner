import { generateNanoId } from "../utils/helper.js"
import urlSchema from "../models/short_url.model.js"

import { getCustomShortUrl, saveShortUrl } from "../dao/short_url.js"


export const createShortUrlWithoutUser = async (url) => {
    const shortUrl = generateNanoId(7)
        if(!shortUrl) throw new Error("Short URL not generated")
    await saveShortUrl(shortUrl,url)
    // newUrl.save();
    return shortUrl
}

export const createShortUrlWithUser = async (url, userId, slug = null) => {

    let shortUrl
    console.log("Slug inside service:", slug)
    if (slug) {
        const exists = await getCustomShortUrl(slug)
        console.log("Slug inside service:", slug)
        if (exists) throw new Error("This custom url already exists")
            console.log("Slug inside service:", slug)
        shortUrl = slug
    } else {
        console.log("Slug inside service:", slug)
        shortUrl = await generateNanoId(7)
    }

    await saveShortUrl(shortUrl, url, userId)
    return shortUrl
}
