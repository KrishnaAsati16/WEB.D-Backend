// require('dotenv').config({path: './env'})

import dotenv, { config } from "dotenv"
// import moongoose from "moongoose";
// import { DB_NAME } from "./constants";
import connectDB from "./db/index.js"

dotenv.config({
    path: './env'
})


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 10000, () =>{
        console.log(`server is running at port : ${process.env.PORT}`)
    })
})
.catch((err) =>{
    console.log("Mongo db connection failed !!!",err)
})





/*
import express from "express"
const app = express()

(async  () => {
    try{
     moongoose.connect(`${process.env.MONGODB_URI}/$
        {DB_NAME}`) // connect kr diya DB Se
        app.on("error", (error) =>{   // call back laga diya ki koi error to ni ha
         console.log("Error:",error)
         throw error
        })

         app.listen(process.env.PORT, () => {
            console.log(`App is Listening on port ${process.env.PORT}`)
         })
     }
    catch(error){
        console.log("ERROR :", error)
    }
})()
*/