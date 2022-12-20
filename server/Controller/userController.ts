import Web3 from "web3"
import express from "express"
import mongoose from "mongoose"
import joi from "joi"
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import userModel from "../Model/userModel"
import { ModifiedRequest } from "../interface"

const web3 = new Web3("https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161")

export const SignUp = (req:ModifiedRequest, res:express.Response) =>{
    const { name, email, password, conPassword} = req.body

    const validation = joi.object({
        name: joi.string(),
        email: joi.string().email(),
        password: joi.string(),
        conPassword: joi.string()
    })

    validation.validateAsync({ name, email, password, conPassword})
    .then((validationResponse)=>{
        userModel.find({ email })
        .then((emailResponse)=>{
            if(emailResponse.length > 0){
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
            bcryptjs.hash(password, 15)
            .then((hashPassword)=>{
                const userAccount = web3.eth.accounts.create()
                console.log("USer: ", userAccount.privateKey)
                //hashing private key of a user
                bcryptjs.hash(userAccount.privateKey,15)
                .then((hashKey)=>{
                    userModel.create({ name, email, password: hashPassword, address: userAccount.address, privateKey: hashKey})
                .then((createResponse)=>{
                    // console.log(web3.eth.accounts.create())
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
                .catch(err=>console.log(err))
                })
                .catch(err=>console.log(err))
                
            })
            .catch(err=>console.log(err))
        })
        .catch(err=>console.log(err))
    })
    .catch(err=>console.log(err))
}

export const SignIn = (req:express.Request, res:express.Response) =>{
    const { email, password } = req.body;

    const validation = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    })

    validation.validateAsync( { email, password})
    .then((validationResponse)=>{
        userModel.findOne( { email })
        .then((emailResponse)=>{
            if(!emailResponse){
                return res.json({
                    message:"User doesn't exists",
                    auth:false,
                    user:null
                })
            }

            bcryptjs.compare(password, emailResponse.password)
            .then((compareResponse)=>{
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
            .catch(err=>console.log(err))
        })
        .catch(err=>console.log(err))
    })
    .catch(err=>console.log(err))
}

export const Status = (req:ModifiedRequest, res: express.Response) =>{
    if(!req.users){
        console.log("false")
        return res.json({
            message:"You are not logged in!",
            user: null,
            auth: false
        })
    }
  
        return res.json({
            message:"You're logged in!!!",
            user:req.users,
            auth: true, 
            token: req.headers
        })
}
