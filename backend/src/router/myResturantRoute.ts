import express from 'express'
import multer from 'multer'
import { createResturant } from '../controller/resturantController'
import { validateMyRestaurantRequest } from '../middleware/validation'
const router= express.Router()
const storage= multer.memoryStorage()
const upload=multer({
    storage:storage,
    limits:{
        fileSize: 5 * 1024 * 1024, //5mb
    }
})
// /api/my/user
router.route('/').post(upload.single("imageFile"),validateMyRestaurantRequest,createResturant)

export default router