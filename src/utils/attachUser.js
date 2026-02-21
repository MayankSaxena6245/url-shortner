import { findUserById } from "../dao/user.dao.js"
import { verifyToken } from "./helper.js"

export const attachUser = async (req, res, next) => {
    console.log("Cookies received:", req.cookies);
    const token = req.cookies.accessToken
    console.log("Token:", token);
    if(!token) return next()

    try {
        const decoded = verifyToken(token)
        console.log("Decoded:", decoded)
        const user = await findUserById(decoded)
        console.log("User found:", user)
        console.log("TOKEN:", token)
        console.log("Decoded token:", decoded)
        console.log("User found:", user)
        if(!user) return next()
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        console.log("Verify error:", error)
        next()
    }
}