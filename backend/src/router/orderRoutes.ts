import express from 'express'
import { createCheckOutSession,stripeWebhookHandler } from '../controller/orderController';
import { jwtCheck,jwtParse } from '../middleware/auth';
const router = express.Router();

router.route("/checkout/create-checkout-session").post(createCheckOutSession)
router.route("/checkout/webhook").post(jwtParse,stripeWebhookHandler)
export default router