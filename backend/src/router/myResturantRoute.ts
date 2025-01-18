import express from 'express'
import multer from 'multer'
import { createResturant,getMyRestaurantOrder,getRestaurant,updateOrderStatus,updateRestaurant } from '../controller/resturantController'
import { validateMyRestaurantRequest } from '../middleware/validation'
import { jwtParse } from '../middleware/auth'
const router= express.Router()
const storage= multer.memoryStorage()
const upload=multer({
    storage:storage,
    limits:{
        fileSize: 5 * 1024 * 1024, //5mb
    }
})
// /api/my/restaurant
router.route('/').post(upload.single("imageFile"),validateMyRestaurantRequest,createResturant)
.get(getRestaurant)
.put(upload.single("imageFile"),validateMyRestaurantRequest,updateRestaurant)
router.route("/order").get(jwtParse,getMyRestaurantOrder)
router.route("/order/:orderId/status").patch(jwtParse,updateOrderStatus)

export default router