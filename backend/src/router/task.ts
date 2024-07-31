import express from 'express'
import { validateMyUserRequest } from '../middleware/validation'
const router=express.Router()
const {updateProfile,
    createUser,
    loggin
} =require('../controller/taskList')
router.route('/my-user').post(createUser)
router.route('/user-loggin').post(loggin)
router.route('/profile').post(validateMyUserRequest,updateProfile)
module.exports=router