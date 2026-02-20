import { createShortUrlWithoutUser, createShortUrlWithUser } from "../services/short_url.service.js"
import { getShortUrl } from "../dao/short_url.js"
import wrapAsync from "../utils/tryCatchWrapper.js"

export const createShortUrl = wrapAsync(async (req,res)=>{
    console.log("BODY:", req.body)

    const { url, slug } = req.body
    console.log("Slug received:", slug)

    let shortUrl

    if (req.user) {
        
        shortUrl = await createShortUrlWithUser(url, req.user._id, slug)
    } else {
        shortUrl = await createShortUrlWithoutUser(url)
    }

    res.status(200).json({shortUrl : process.env.APP_URL + shortUrl})
})





export const redirectFromShortUrl = wrapAsync(async (req,res)=>{
    const {id} = req.params
    const url = await getShortUrl(id)
    if(!url) throw new Error("Short url not found")
    res.redirect(url.full_url)
})

export const createCustomShortUrl = wrapAsync(async (req,res)=>{
    const {url,slug} = req.body
    const shortUrl = await createShortUrlWithoutUser(url,customUrl)
    res.status(200).json({shortUrl : process.env.APP_URL + shortUrl})
})