import express from 'express'
import { createCheckOutSession } from '../controller/orderController';
import { jwtCheck,jwtParse } from '../middleware/auth';
const router = express.Router();

router.route("/checkout/create-checkout-session").post(jwtCheck,jwtParse,createCheckOutSession)
export default router