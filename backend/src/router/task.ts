import express from 'express'
const router=express.Router()
const {getProfile,createUser} =require('../controller/taskList')
router.route('/my-user').post(createUser)
router.route('/profile').get(getProfile)
module.exports=router