import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

appp.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true, limit:
    "20kb"}))  // url per extra kuch add ho  jata h usko handle karne ke liye 
    app.use(express.static("public"))

    app.use(cookieParser())



export {app}