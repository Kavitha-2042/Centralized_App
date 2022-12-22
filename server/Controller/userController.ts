import Web3 from "web3"
import express from "express"
import mongoose from "mongoose"
import joi from "joi"
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import asyncHandler from "express-async-handler"

import userModel from "../Model/userModel"
import { ModifiedRequest } from "../interface"

const web3 = new Web3("https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161")

export const SignUp = asyncHandler(async(req:express.Request, res:express.Response):Promise<any> =>{
    const { name, email, password, conPassword} = req.body

    const {users }:any = req

    const validation = joi.object({
        name: joi.string(),
        email: joi.string().email(),
        password: joi.string().min(8).max(20).uppercase().lowercase(),
        conPassword: joi.string()
    })

    const validate = await validation.validateAsync({ name, email, password, conPassword})
    const emailResponse = await userModel.find({ email })
    if(( emailResponse).length > 0){
        return res.json({
            message:"User already exists",
            auth:false,
            user:null
        })
    }

    if(password !== conPassword){
        return res.json({
            message:"Password doesn't match with confirm password",
            auth:false,
            user:null
        })
    }

    const hashPassword =await  bcryptjs.hash(password, 15)
    const userAccount =await  web3.eth.accounts.create()
    console.log("USer: ", userAccount.privateKey)
    //hashing private key of a user
    const hashKey =await  bcryptjs.hash(userAccount.privateKey,15)
    const createResponse =await  userModel.create({ name, email, password: hashPassword, address: userAccount.address, privateKey: hashKey})
    return res.json({
        message:"SignUp Successfull",
        // response: createResponse,
        auth:true,
        user:createResponse, 
        // userAccount: userAccount,
        // key: hashKey,
        address: userAccount.address,
        originalKey: userAccount.privateKey
    })
})

export const SignIn = asyncHandler(async(req:express.Request, res:express.Response):Promise<any> =>{
    const {users }:any=req;
    const { email, password } = req.body;

    const validation = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(8).max(20).uppercase().lowercase(),
    })

    const validationResponse = await validation.validateAsync( { email, password})
    const emailResponse = await userModel.findOne( { email })
    if(!emailResponse){
        return res.json({
            message:"User doesn't exists",
            auth:false,
            user:null
        })
    }

    const compareResponse = await bcryptjs.compare(password, emailResponse.password)
    if(!compareResponse){
        return res.json({
            message:"Incorrect password",
            auth:false,
            user:null
        })
    }

    let token = jwt.sign({ _id: emailResponse._id}, process.env.HASH_KEY as string)

    return res.json({
        message:"SignIn Successfull",
        user:emailResponse, 
        token, 
        auth: true
    })

})


export const Status =asyncHandler(async(req:express.Request, res: express.Response):Promise<any> =>{
    const {users}:any = req;
    if(!users){
        console.log("false")
        return res.json({
            message:"You are not logged in!",
            user: null,
            auth: false
        })
    }
    return res.json({
        message:"You're logged in!!!",
        user:users,
        auth: true, 
        token: req.headers
    })

})
    

export const QRcode =asyncHandler(async(req:express.Request, res:express.Response):Promise<any> =>{
    const {users}:any = req;

    const { email }  = req.body

    const findResponse = await userModel.find({ email })

    const balanceResponse = await  web3.eth.getBalance(findResponse[0].address as string)

    return res.json({
        message:"address sent!",
        address: findResponse[0].address,
        balance: web3.utils.fromWei(balanceResponse, "ether")
    })

})
    