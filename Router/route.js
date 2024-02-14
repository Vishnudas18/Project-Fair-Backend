//import express
const express = require('express')

const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require("../Middlewares/jwtMiddleware")
const multerConfig = require('../Middlewares/multerMiddlware')

//create a router object of express to define routes(paths)
const router = new express.Router()

//using router object to define paths

//1 Register API Routes --> localhost:5000/register
router.post('/register',userController.register)

//2 Login API Routes --> localhost:5000/login
router.post('/login',userController.login)

//3 add user project API routes - localhost:5000/project/add
router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addUserProject)

//4 get user project api routes - localhost:5000/user/all-projects
router.get('/project/all-user-projects',jwtMiddleware, projectController.getUserProject)

//5 get all project routes - localhost:5000/projects/all-projects
router.get('/project/all-projects',jwtMiddleware,projectController.getAllProject)

//6 get home projects routes - localhost:5000/projects/home-projects
router.get('/project/home-projects',projectController.getHomeProject)

//7 update project routes - localhost:5000/projects/update-project/7869909876755
router.put('/project/update-project/:id',jwtMiddleware,multerConfig.single('projectImage'),projectController.editProject)

//8 Delete project routes - localhost:5000/projects/delete-project/6767676778558658
router.delete('/project/delete-project/:pid',jwtMiddleware,projectController.deleteProject)

module.exports = router