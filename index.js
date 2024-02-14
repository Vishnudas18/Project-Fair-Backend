//loads .env file into process.env
require('dotenv').config() //Loads .env file contents into process.env by default

//import express
const express = require('express');

//import cors
const cors = require('cors');

const db = require('./DB/connection')

//import route
const router = require('./Router/route')

 const appMiddleware = require("./Middlewares/appMiddleware")

 const jwtMiddleware = require("./Middlewares/jwtMiddleware")

//create a backend application using express
const pfServer = express()

//use 
pfServer.use(cors())
pfServer.use(express.json())
// pfServer.use(appMiddleware)
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))//to export image from server to client


//port creation
const port = 5000 || process.env.port

//server listen
pfServer.listen(port,()=>{
    console.log('listening on port' +port);
})

//http - get resolving to http://localhost5000
pfServer.get("/",(req,res)=>{
    res.send('<h1>Project Fair Is Started...</h1>')
})