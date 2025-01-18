import express from 'express'
import { createCheckOutSession,stripeWebhookHandler,getMyOrder } from '../controller/orderController';
import { jwtCheck,jwtParse } from '../middleware/auth';
const router = express.Router();

router.route("/checkout/create-checkout-session").post(jwtParse,createCheckOutSession)
router.route("/checkout/webhook").post(stripeWebhookHandler)
router.route("/").get(jwtParse,getMyOrder)
export default router