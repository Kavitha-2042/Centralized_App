import express from "express"
import { ModifiedRouter } from "../interface"
import * as userController from "../Controller/userController"
import middleware from "../Middleware/middleware"

const userRoute:ModifiedRouter = express.Router()

userRoute.post('/signup',  userController.SignUp)

userRoute.post('/signin', middleware, userController.SignIn)

userRoute.get('/status', middleware, userController.Status)

userRoute.post('/qrcode', userController.QRcode)

userRoute.post('/history', userController.TransactionHistory)

export default userRoute