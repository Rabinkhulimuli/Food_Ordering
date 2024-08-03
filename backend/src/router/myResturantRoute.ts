import express from 'express'
import multer from 'multer'
import { createResturant } from '../controller/resturantController'

const router= express.Router()
const storage= multer.memoryStorage()
const upload=multer({
    storage:storage,
    limits:{
        fileSize: 5 * 1024 * 1024, //5mb
    }
})
// /api/my/user
router.route('/').post(upload.single("imageFile"),createResturant)

export default router