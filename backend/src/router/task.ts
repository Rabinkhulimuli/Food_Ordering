import express from 'express'
const router=express.Router()
const {getProfile,
    createUser,
    loggin
} =require('../controller/taskList')
router.route('/my-user').post(createUser)
router.route('/user-loggin').post(loggin)
router.route('/profile').get(getProfile)
module.exports=router