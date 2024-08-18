import express from "express";
import { param } from "express-validator";
import { searchRestaurant } from "../controller/restaurantDetailController";
const router = express.Router();

//api/restaurant/search
router
  .route("/search/:city")
  .get(
    param("city")
      .isString()
      .trim()
      .notEmpty()
      .withMessage("city parameter must be a valid string"),
      searchRestaurant
  );
export default router