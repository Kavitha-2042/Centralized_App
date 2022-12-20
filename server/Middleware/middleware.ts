// import dotenv from "dotenv"
// dotenv.config()
// import express from "express"
// import jwt from "jsonwebtoken"
// import bcryptjs from "bcryptjs"

// import { ModifiedRequest  } from "../interface"
// import userModel from "../Model/userModel"

// const middleware = (req:ModifiedRequest, res: express.Response, next: express.NextFunction) =>{
//     let token =  req.headers['jwt-token'] as string

//     if(token){
//         let verifying = jwt.verify(token, process.env.HASH_KEY as string)
//         let decoding:any = jwt.decode(token)
//         try {
//             if(req.path !== '/signup' && req.path !== '/signin' && req.path !== '/status'){
//                 userModel.findById({_id:decoding._id})
//                 .then((findResponse)=>{
//                     req.users = findResponse
//                     next()
//                 })
//                 .catch(err=>console.log(err))
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     else{
//         if(req.path === '/signup' || req.path === '/signin' || req.path === '/status'){
//             next()
//         }
//         else{
//             return res.json({
//                 message:"Invalid path",
//                 auth: false,
//                 user: null
//             })
//         }
//     }
// }

// export default middleware


import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

import { ModifiedRequest } from '../interface'
import userModel from '../Model/userModel'

const middleware = (req:ModifiedRequest, res:express.Response, next:express.NextFunction) =>{
    let token = req.headers['jwt-token'] as string
    // console.log("Token middle: ", token)

    if(token){
        let verifying = jwt.verify(token, process.env.HASH_KEY as string)
        let decoding:any = jwt.decode(token)
        try{
            if(req.path !== '/signup' && req.path !== '/signin' ){
                userModel.findById({_id:decoding._id})
                .then((findResponse)=>{
                    if(findResponse){
                        req.users = findResponse
                        next()
                    }
                })
                .catch(err=>console.log(err))
            }

        }catch (err) {
                return res.json({
                    message:"Invalid token or expired token",
                    user:null,
                    auth:false
                })
        }
    }else{
        if(req.path === '/signup' || req.path === '/signin'){
            next()
        }
        else{
            return res.json({
                message:"Invalid path",
                auth:false,
                user:null
            })
        }
    }
}

export default middleware