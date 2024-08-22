import express from 'express'
import { validateMyUserRequest } from '../middleware/validation'
const router=express.Router()
const {updateProfile,
    createUser,
    loggin,
    getProfile,
    logOut
} =require('../controller/taskList')
router.route('/my-user').post(createUser)
router.route('/user-loggin').post(loggin)
router.route('/profile').get(getProfile).put(validateMyUserRequest,updateProfile)
router.route('/logout').post(logOut)
export default router