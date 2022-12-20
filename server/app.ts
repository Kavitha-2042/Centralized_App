import dotenv from "dotenv"
dotenv.config()
import express from "express"
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors"
import userRoute from "./Route/userRoute";

const app:express.Application = express()

app.use(cors({
    credentials:true,
    origin: process.env.REACT_URL,
    methods: ["get", "post"]
}))

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/user',userRoute)

mongoose.set("strictQuery", false)

mongoose.connect(process.env.MONGOOSE_URL as string,()=>{
    console.log("Db Connected")
    app.listen(process.env.PORT as string, ()=>{
        console.log(`Server runs on port ${process.env.PORT}`)
    })
})