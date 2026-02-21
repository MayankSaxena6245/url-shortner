console.log("Hello Node ");
import express from "express";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import cors from "cors"

import mongoose from "mongoose";
import short_url from "./src/routes/short_url.route.js"
import user_routes from "./src/routes/user.route.js"
import auth_routes from "./src/routes/auth.routes.js"

import { errorHandler } from "./src/utils/errorHandler.js";


import urlSchema from "./src/models/short_url.model.js"
import connectDB from "./src/config/monogo.config.js"
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";

import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from "cookie-parser";

const app= express();

app.use(cors({
    origin: "https://url-shortner-f-5yfy.onrender.com",
    credentials: true
}));
app.set("trust proxy", 1);


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(attachUser)

app.use("/api/user",user_routes)
app.use("/api/auth",auth_routes)
app.use("/api/create",short_url)

app.get("/:id",redirectFromShortUrl)
app.use(errorHandler)

app.listen(3000,()=>{
    connectDB()
    console.log("Server runnning on http://localhost:3000");
})

