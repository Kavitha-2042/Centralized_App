import express from "express"

export interface ModifiedRequest extends express.Request{
    users:any
}

export interface ModifiedRouter extends express.IRouter{
    get:(path:string,...middleware:any)=>void
    post:(path:string,...middleware:any)=>void
}