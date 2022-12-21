import Web3 from "web3"
import express from "express"
import mongoose from "mongoose"
import joi from "joi"
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import Tx from "ethereumjs-tx"
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");

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

export const QRcode = (req:ModifiedRequest, res:express.Response) =>{
    const { email }  = req.body

    userModel.find({ email })
    .then((findResponse)=>{
        web3.eth.getBalance(findResponse[0].address as string)
        .then((balanceResponse)=>{
            return res.json({
                message:"address sent!",
                address: findResponse[0].address,
                balance: web3.utils.fromWei(balanceResponse, "ether")
            })
        })
        .catch(err=>console.log(err))
    })
    .catch(err=>console.log(err))
}

export const TransactionHistory = (req:express.Request, res:express.Response) =>{
    const { email } = req.body 

    userModel.find({ email })
    .then((findResponse)=>{
       const address = findResponse[0].address
       console.log(address)
       web3.eth.getBalance(address as string)
       .then(console.log)
       web3.eth.getBlockNumber()
       .then(console.log)
        //  web3.eth.getTransactionCount(address as string)
         web3.eth.getTransactionCount("0x47f4d3fad99e81e54e391E91ae7781547B51B238")
         .then(console.log)

        // const lastBlockNumber = web3.eth.getBlockNumber()
       web3.eth.getBlock("latest")
       .then((block)=>{
        console.log({
            blockHash: block.hash,
            blockNumber: block.number
            
        })
        var blockHash = block.hash;
        web3.eth.getTransaction(block.hash)
        .then(console.log)

        

        // var transaction = web3.eth.getTransactionFromBlock(block.number, 3)
        var transaction = web3.eth.getTransactionFromBlock(8173703, 3)
        .then((response)=>{
            return res.json({
                message:"check",
                res:response
            })
        })
        
       })
    })
    .catch(err=>console.log(err))
}


export const withdraw = (req:express.Request, res:express.Response) =>{
    
}
